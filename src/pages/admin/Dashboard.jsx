import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../components/admin/NavbarAdmin";
import CardAdmin from "../../components/admin/CardAdmin";
import { supabase } from "../../api/supabaseClient";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [support, setSupport] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data: usersData } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: feedbacksData } = await supabase
        .from("feedbacks")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: supportData } = await supabase
        .from("support")
        .select("*")
        .order("created_at", { ascending: false });

      if (usersData) setUsers(usersData);
      if (feedbacksData) setFeedbacks(feedbacksData);
      if (supportData) setSupport(supportData);
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <NavbarAdmin />

      <main className="p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Utilisateurs */}
        <CardAdmin
          title="Utilisateurs"
          count={users.length}
          icon="👤"
          color="from-green-400 to-green-600"
        >
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 bg-white/5 rounded-md hover:bg-white/10 transition"
            >
              <p className="font-medium break-words">{user.email}</p>
              <p className="text-xs text-gray-400">{new Date(user.created_at).toLocaleString()}</p>
            </div>
          ))}
        </CardAdmin>

        {/* Feedbacks */}
        <CardAdmin
          title="Derniers Feedbacks"
          count={feedbacks.length}
          icon="📝"
          color="from-blue-400 to-blue-600"
        >
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="p-4 bg-white/5 rounded-md hover:bg-white/10 transition"
            >
              <p className="font-semibold break-words">{fb.message}</p>
              <p className="text-xs text-gray-400">{new Date(fb.created_at).toLocaleString()}</p>
            </div>
          ))}
        </CardAdmin>

        {/* Support */}
        <CardAdmin
          title="Messages Support"
          count={support.length}
          icon="💬"
          color="from-purple-400 to-purple-600"
        >
          {support.map((msg) => (
            <div
              key={msg.id}
              className="p-4 bg-white/5 rounded-md hover:bg-white/10 transition"
            >
              <p className="font-bold">{msg.sujet}</p>
              <p className="text-sm break-words mb-1">{msg.message}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{msg.nom} - {msg.email}</span>
                <span>{new Date(msg.created_at).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </CardAdmin>
      </main>
    </div>
  );
}
