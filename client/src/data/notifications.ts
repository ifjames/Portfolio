export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning";
  timestamp: Date;
  read: boolean;
}

// ===== NOTIFICATION MANAGEMENT =====
// To add a new notification:
// 1. Add a new object to the notifications array below
// 2. Set the appropriate type: "info", "success", or "warning"
// 3. Set the timestamp (you can use new Date() for current time)
// 4. Set read: false for new notifications
//
// ⭐ AUTOMATIC SORTING: Notifications are automatically sorted by timestamp
// (newest first) when displayed, so you don't need to worry about order!
//
// To update notifications:
// - Edit the existing notification objects
// - Remove notifications by deleting them from the array
// - The system will automatically sort them by timestamp

export const notifications: Notification[] = [
  {
    id: "1",
    title: "Portfolio Updated",
    message: "Welcome to my interactive portfolio! Feel free to explore and use the chatbot for any questions.",
    type: "info",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false,
  },
  {
    id: "2", 
    title: "New Project Added",
    message: "Check out my latest work in the projects section - Analytics Dashboard with interactive charts.",
    type: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
  },
  {
    id: "3",
    title: "Available for Work",
    message: "I'm currently accepting new project opportunities. Let's discuss your next idea!",
    type: "warning", 
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
  },
  {
    id: "4",
    title: "New Features Added",
    message: "Added animated mascot and improved project locking system. Everything is now more interactive!",
    type: "success",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
  },
];

// Helper functions for notification management
export const getUnreadNotifications = () => notifications.filter(n => !n.read);
export const getUnreadCount = () => getUnreadNotifications().length;
export const getRecentNotifications = (limit: number = 5) => 
  notifications
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, limit);

// Examples of notifications you might add:
// 
// New Project Example:
// {
//   id: "unique-id",
//   title: "New Project: E-Commerce Platform",
//   message: "Just launched a new full-stack e-commerce platform with React and Node.js. Check it out in the projects section!",
//   type: "success",
//   timestamp: new Date(),
//   read: false,
// }
//
// Work Update Example:
// {
//   id: "unique-id", 
//   title: "Currently Unavailable",
//   message: "I'm currently working on a major project and not taking new clients until next month.",
//   type: "warning",
//   timestamp: new Date(),
//   read: false,
// }
//
// General Info Example:
// {
//   id: "unique-id",
//   title: "Portfolio Maintenance", 
//   message: "The portfolio will be briefly offline tomorrow for server maintenance. Thank you for your patience!",
//   type: "info", 
//   timestamp: new Date(),
//   read: false,
// }
