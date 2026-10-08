import { useState } from "react";

function Message({ type = "user", children }) {
  return (
    <div className={`message ${type}-message`}>
      <div className="message-content">{children}</div>
    </div>
  );
}

function ChatMessages({ messages = [] }) {
  return (
    <div className="chat-messages">
      {messages.map((message) => (
        <Message key={message.id} type={message.type}>
          {message.content}
        </Message>
      ))}
    </div>
  );
}

function ChatInput({ onAddMessage }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    const formData = new FormData(event.target);
    const message = formData.get("message").trim();

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);

    if (!message) {
      return;
    }

    if (onAddMessage) {
      onAddMessage(message);
    }

    event.target.reset();
  };

  return (
    <div className="chat-input-container">
      <form className="chat-input-wrapper" onSubmit={handleSubmit}>
        <textarea
          name="message"
          className="chat-input"
          placeholder="Type your message here..."
          rows={1}
        />
        <button className="send-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "sending..." : "send"}
        </button>
      </form>
    </div>
  );
}

export { Message, ChatMessages, ChatInput };
