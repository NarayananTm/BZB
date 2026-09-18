# Notifications API Documentation

## Overview
The Notifications API provides endpoints to fetch and manage notifications for the application.

## Endpoints

### GET `/api/notifications`
Fetch all notifications or filter by read status.

**Query Parameters:**
- `unread` (optional): Set to `true` to fetch only unread notifications

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": "notification-123",
      "title": "New Member Joined",
      "message": "Kavi has joined your Level 1 network.",
      "type": "Member",
      "is_read": false,
      "created_at": "2024-01-10T10:30:00Z"
    }
  ]
}
```

### PUT `/api/notifications/{id}`
Mark a specific notification as read.

**URL Parameters:**
- `id` (required): The notification ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "notification-123",
    "title": "New Member Joined",
    "message": "Kavi has joined your Level 1 network.",
    "type": "Member",
    "is_read": true,
    "created_at": "2024-01-10T10:30:00Z"
  }
}
```

### PUT `/api/notifications` (bulk)
Mark multiple notifications as read.

**Request Body:**
```json
{
  "id": "notification-123"
}
```

**Response:**
Same as single notification update.

## Usage in Frontend

### Fetch Notifications
```typescript
const response = await fetch('/api/notifications');
const data = await response.json();
```

### Mark Single Notification as Read
```typescript
const response = await fetch('/api/notifications/notification-123', {
  method: 'PUT'
});
```

### Fetch Only Unread Notifications
```typescript
const response = await fetch('/api/notifications?unread=true');
const data = await response.json();
```

## Component Updates

The `AllNotificationPage` component now:
- Fetches notifications from the API on mount
- Displays loading and error states
- Marks individual notifications as read with API calls
- Marks all unread notifications as read with bulk API calls
- Automatically updates the UI after API calls
- Shows empty state when no notifications exist

## Features

✅ Dynamic notifications from backend
✅ Real-time marking as read
✅ Loading and error states
✅ Bulk operations for marking all as read
✅ Responsive design maintained
✅ Time formatting for relative timestamps
