import {
  Bell,
  CheckCircle,
  Info,
  AlertTriangle,
  Trash2,
  X
} from "lucide-react";
import { useState } from "react";

const NotificationPanel = ({ onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New User Registered",
      message: "A new user has signed up on the website.",
      type: "info",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      title: "Password Changed",
      message: "Admin password was updated successfully.",
      type: "success",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "System Alert",
      message: "High server usage detected.",
      type: "warning",
      time: "Yesterday",
      read: true,
    },
  ]);

  const clearAll = () => setNotifications([]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const iconMap = {
    info: <Info className="text-blue-600" size={20} />,
    success: <CheckCircle className="text-green-600" size={20} />,
    warning: <AlertTriangle className="text-yellow-500" size={20} />,
  };

  return (
    <>
      {/* OVERLAY – 70% opacity, NO BLUR */}
      <div
        className="fixed inset-0 bg-black/70 z-40"
        onClick={onClose}
      />

      {/* POPUP */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h2 className="flex items-center gap-2 font-semibold">
              <Bell size={20} /> Notifications
            </h2>

            <div className="flex items-center gap-3">
              <button
                onClick={clearAll}
                className="text-sm text-red-500 flex items-center gap-1"
              >
                <Trash2 size={16} /> Clear
              </button>

              {/* ❌ CLOSE WORKING */}
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* LIST */}
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-center text-gray-400 py-10">
                No notifications
              </p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={`flex gap-3 px-5 py-4 border-b cursor-pointer transition
                  ${n.read ? "bg-gray-50" : "bg-orange-50 hover:bg-orange-100"}`}
                >
                  <div className="mt-1">
                    {iconMap[n.type]}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold">{n.title}</h4>
                    <p className="text-sm text-gray-600">
                      {n.message}
                    </p>
                    <span className="text-xs text-gray-400">
                      {n.time}
                    </span>
                  </div>

                  {!n.read && (
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2"></span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
