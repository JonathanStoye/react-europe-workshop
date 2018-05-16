import React, { Component } from "react";
import ChatMessage from "./ChatMessage";

export default class ChatList extends Component {
  listRef = null;
  scrollOffset = null;

  state = {
    filteredMessages: this.props.filter
      ? filterMessages(this.props.messages)
      : []
  };

  /**
   * FIX ME
   *
   * With async rendering there may be a delay
   * between the "render" and "commit" phases.
   * Since componentWillUpdate is a "render"
   * phase lifecycle, it might have stale data.
   *
   * There's a new commit phase lifecycle called
   * getSnapshotBeforeUpdate. Refactor this
   * to use that instead.
   */
  componentWillUpdate(nextProps) {
    if (nextProps.messages.length > this.props.messages.length) {
      // Check if the user is at the bottom of the
      // window, or if they've scrolled up.
      const { scrollHeight, scrollTop, offsetHeight } = this.listRef;
      const offset = scrollHeight - offsetHeight;
      const scrollOffset = scrollTop - offset;
      this.scrollOffset = scrollOffset;
      /**
       * FIX ME
       *
       * componentWillUpdate may be called multiple
       * times for an update. We should only call
       * external callbacks when we know the component
       * has updated.
       *
       * Move this to the commit phase lifecycle
       * that's called when a component updates.
       */
      this.props.onScrollOffsetChange(scrollOffset);
    }
  }

  componentDidUpdate(prevProps) {
    // If the scroll offset was zero, the user was
    // at the bottom of the chat window. Make sure
    // to keep them at the bottom.
    if (this.scrollOffset === 0) {
      const { scrollHeight } = this.listRef;
      this.listRef.scrollTop = scrollHeight;
      this.scrollOffset = null;
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Only update the filtered messages if a filter
    // actually exists...
    if (
      nextProps.filter &&
      (nextProps.filter !== prevState.filter ||
        nextProps.messages !== prevState.messages)
    ) {
      // Only filter again if the filter changed... // ...or the messages changed.
      return {
        filteredMessages: filterMessages(nextProps.messages, nextProps.filter)
      };
    }
    return null;
  }

  render() {
    const { filteredMessages } = this.state;
    const { messages, filter } = this.props;
    const activeMessages = filter ? filteredMessages : messages;
    return (
      <div
        ref={ref => (this.listRef = ref)}
        className="list-group list-group-flush"
      >
        {activeMessages.map(message => (
          <ChatMessage key={message.id} {...message} />
        ))}
      </div>
    );
  }
}

// A small utility method for applying a filter.
function filterMessages(messages, filter) {
  return messages.filter(({ message }) => {
    const haystack = message.toLowerCase();
    const needle = filter.toLowerCase();
    return haystack.includes(needle);
  });
}
