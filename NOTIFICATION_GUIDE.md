# Notification Management Guide

This guide explains how to easily manage notifications in your portfolio.

## 📍 Location
All notifications are managed in: `/client/src/data/notifications.ts`

## ⭐ Automatic Sorting
Notifications are **automatically sorted by timestamp** (newest first) when displayed. You don't need to worry about the order when adding them - just add new notifications anywhere in the array and they'll appear in the correct chronological order!

## 🔄 How to Add a New Notification

When you create a new project or have updates, simply edit the `notifications` array in `/client/src/data/notifications.ts`:

### Example: Adding a New Project Notification

```typescript
{
  id: "5", // Use a unique ID
  title: "New Project: Task Manager App",
  message: "Just completed a React-based task management application with drag-and-drop functionality. Check it out!",
  type: "success", // "info", "success", or "warning"
  timestamp: new Date(), // Current time
  read: false, // New notifications should be unread
}
```

### Example: Availability Update

```typescript
{
  id: "6",
  title: "Available for Freelance Work",
  message: "I'm currently available for new freelance projects. Let's build something amazing together!",
  type: "warning", // Use warning for important updates
  timestamp: new Date(),
  read: false,
}
```

### Example: Portfolio Maintenance

```typescript
{
  id: "7", 
  title: "Portfolio Updates",
  message: "Added new features including project filtering and improved mobile responsiveness.",
  type: "info",
  timestamp: new Date(),
  read: false,
}
```

## 🎨 Notification Types

- **`"info"`** - General information (blue icon)
- **`"success"`** - Positive updates like new projects (green icon)  
- **`"warning"`** - Important notices like availability (yellow icon)

## ⏰ Timestamp Examples

```typescript
// Current time
timestamp: new Date()

// 1 hour ago
timestamp: new Date(Date.now() - 1000 * 60 * 60)

// 1 day ago  
timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)

// Specific date
timestamp: new Date('2025-06-01')
```

## 🔧 Quick Actions

### To add a notification:
1. Open `/client/src/data/notifications.ts`
2. Add a new object to the `notifications` array
3. Save the file - changes appear immediately!

### To remove a notification:
1. Find the notification in the array
2. Delete the entire object
3. Save the file

### To mark as read:
1. Change `read: false` to `read: true`
2. Save the file

## 💡 Pro Tips

- Keep notification IDs unique (use numbers or descriptive strings)
- Use descriptive titles that grab attention
- Keep messages concise but informative  
- Set `read: false` for notifications you want to highlight
- **Timestamps automatically sort notifications** - newest appear first
- The notification bell shows a red badge when there are unread notifications
- You can add notifications anywhere in the array - they'll be sorted automatically!

## 🚀 Auto-sync with Projects

Consider updating notifications when you:
- Add a new project to `/client/src/data/projects.ts`
- Change your availability status
- Update your portfolio with new features
- Complete client work
- Have important announcements
