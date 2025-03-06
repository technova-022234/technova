import React, { useEffect, useState } from "react";
import axios from "axios";

const Level2Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Assuming your API endpoint for level2 leaderboard is /api/leaderboard/level2
        const response = await axios.get("http://localhost:5000/api/leaderboard/level2");
        setLeaderboard(response.data.leaderboard);
      } catch (error) {
        setError("Failed to load leaderboard.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">🚀 Level 2 Leaderboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 border border-gray-700">Rank</th>
              <th className="p-2 border border-gray-700">Team</th>
              <th className="p-2 border border-gray-700">Email</th>
              <th className="p-2 border border-gray-700">Level 1 Score</th>
              <th className="p-2 border border-gray-700">Level 1 Time</th>
              <th className="p-2 border border-gray-700">Level 2 Moves</th>
              <th className="p-2 border border-gray-700">Level 2 Time</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((player, index) => (
              <tr key={player.email} className="text-center hover:bg-gray-800">
                <td className="p-2 border border-gray-700">{index + 1}</td>
                <td className="p-2 border border-gray-700">{player.teamName}</td>
                <td className="p-2 border border-gray-700">{player.email}</td>
                <td className="p-2 border border-gray-700 font-bold">{player.level1.score}</td>
                <td className="p-2 border border-gray-700">
                  {new Date(player.level1.submissionTime).toLocaleString()}
                </td>
                <td className="p-2 border border-gray-700 font-bold">{player.level2.moves}</td>
                <td className="p-2 border border-gray-700">
                  {new Date(player.level2.submissionTime).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Level2Leaderboard;
