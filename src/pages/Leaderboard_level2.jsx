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
                const response = await axios.get(
                    "http://localhost:5000/api/leaderboard/level2"
                );
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
        <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-900 to-black text-white  shadow-lg max-w-8xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">
                🚀 Level 2 Leaderboard</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-indigo-800">
                            <th className="p-2 border border-indigo-700">Rank</th>
                            <th className="p-2 border border-indigo-700">Team</th>
                            <th className="p-2 border border-indigo-700">
                                Email
                            </th>
                            <th className="p-2 border border-indigo-700">
                                Level 1 Score
                            </th>
                            <th className="p-2 border border-indigo-700">
                                Level 1 Time
                            </th>
                            <th className="p-2 border border-indigo-700">
                                Level 2 Moves
                            </th>
                            <th className="p-2 border border-indigo-700">
                                Level 2 Time
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((player, index) => (
                            <tr
                                key={player.email}
                                className="text-center hover:bg-indigo-700"
                            >
                                <td className="p-2 border border-indigo-700">
                                    {index + 1}
                                </td>
                                <td className="p-2 border border-indigo-700">
                                    {player.teamName}
                                </td>
                                <td className="p-2 border border-indigo-700">
                                    {player.email}
                                </td>
                                <td className="p-2 border border-indigo-700 font-bold">
                                    {player.level1.score}
                                </td>
                                <td className="p-3 border border-indigo-700">
                                    {isNaN(
                                        new Date(
                                            player.level1.submissionTime
                                        ).getTime()
                                    )
                                        ? "Not Submitted"
                                        : new Date(
                                              player.level1.submissionTime
                                          ).toLocaleString()}
                                </td>
                                <td className="p-2 border border-indigo-700 font-bold">
                                    {player.level2.moves}
                                </td>
                                <td className="p-3 border border-indigo-700">
                                    {isNaN(
                                        new Date(
                                            player.level2.submissionTime
                                        ).getTime()
                                    )
                                        ? "Not Submitted"
                                        : new Date(
                                              player.level1.submissionTime
                                          ).toLocaleString()}
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
