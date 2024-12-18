import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';
import { useNavigate} from "react-router-dom";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  // Get token and extract studentId
  
  
  const token = localStorage.getItem('token')|| sessionStorage.getItem("sessiontoken");
  if (!token) {
    alert("No token found, please log in again");
    navigate('/user/login/student', { replace: true });
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {

      // Fetch notifications on component mount
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/dashboard/student/notifications`, config);
        setNotifications(response.data);

        setUnreadCount(response.data.filter(noti => !noti.isRead).length); // Count unread notifications
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    // Poll notifications every 10 seconds
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Handle notification click
  const handleNotificationClick = async (notification) => {
    alert(`Notification: "${notification.title}" - ${notification.body}`);
    try {
      // Mark as read
      await axios.patch(`http://localhost:8080/api/dashboard/student/mark-read/${notification._id}`, null, config);
      console.log(notification._id)
      // Update local state
      setNotifications(notifications.filter(noti => noti._id !== notification._id)); // Remove from dropdown
      setUnreadCount(unreadCount - 1); // Decrement unread count
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  // Handle delete notification
  const handleDeleteNotification = async (notificationId) => {
    try {
      await axios.delete(`http://localhost:8080/api/dashboard/student/delete/notification/${notificationId}`, config);
      console.log({notificationId})
      // Remove from local state
      setNotifications((prevNotifications) =>
        prevNotifications.filter((noti) => noti._id !== notificationId)
      );

      // Update unread count if the deleted notification was unread
      setUnreadCount((prevCount) =>
        notifications.find((noti) => noti._id === notificationId && !noti.isRead)
          ? prevCount - 1
          : prevCount
      );
      alert('Notification deleted successfully');
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Notification Bell */}
      <div onClick={() => setDropdownOpen(!dropdownOpen)} style={{ cursor: 'pointer', fontSize: '24px' }}>
      <i className='bx bx-bell'></i>
        {unreadCount > 0 && (
          <span
            style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                width: '20px',
                height: '20px',
                background: 'var(--danger)',
                borderRadius: '50%',
                color: 'var(--light)',
                border: '2px solid var(--light)',
                fontWeight: '700', // Fixed to camelCase
                fontSize: '12px',  // Fixed to camelCase
                display: 'flex', // Use comma instead of semicolon
                alignItems: 'center', // Fixed to camelCase
                justifyContent: 'center', // Fixed to camelCase
                
            }}
          >
            {unreadCount}
          </span>
        )}
      </div>

      {/* Dropdown */}
      {dropdownOpen && (
        <div
          style={{
            position: 'absolute',
            top: '30px',
            right: '0',
            width: '300px',
            background: 'white',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '5px',
            zIndex: 1000,
            height: '400px',
            overflowY:'scroll',
          }}
        >
          <ul style={{ listStyleType: 'none', margin: 0, padding: '10px' }}>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li
                  key={notification._id}
                  onClick={() => handleNotificationClick(notification)}
                  style={{
                    padding: '10px',
                    borderBottom: '1px solid #ddd',
                    color: notification.isRead ? '#6c757d' : '#000', // Grayscale for read notifications
                    cursor: 'pointer',
                    textDecoration: notification.isRead ? 'line-through' : 'none', // Optional: strike-through
                  }}
                >
                  {` ${notification.title}`}
                  <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the notification click
                    handleDeleteNotification(notification._id);
                  }}
                  style={{
                    marginLeft:"50px",
                    padding:'2px',
                  }}
                  >&#10006;</button>
                </li>
              ))
            ) : (
              <li style={{ textAlign: 'center', padding: '10px' }}>No new notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
