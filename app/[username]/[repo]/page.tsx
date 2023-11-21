"use client";

import { useRouter } from 'next/router';
import { useEffect } from "react";

import AOS from 'aos';
import 'aos/dist/aos.css';
import getGitHubInfo, { GitHubInfo } from '@/lib/getGitHubInfo';
import React from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    ArcElement,
} from 'chart.js';
import { Line, Doughnut } from "react-chartjs-2";
import { Card } from '@/components/ui/card';

export default function RepoStats({ params }: any) {
    let {username, repo} = params;
    useEffect(() => {
        AOS.init();
        ChartJS.register(
            CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            Title,
            Tooltip,
            ArcElement,
          );
    }, []);

    const [repoInfo, setRepoInfo] = React.useState<GitHubInfo | null>(null);
    
    useEffect(() => {
        async function fetch() {
            setRepoInfo(await getGitHubInfo(username, repo));
        }
        fetch();
    }, []);

    return (
        <section className="md:py-10 flex flex-col justify-center items-center h-screen">
            <div className="w-2/4 relative">
                <div className="w-full">
                    <h1 className="text-3xl font-bold">Stats for {username} / {repo}</h1>
                </div>
                <div className="flex w-full">
                    <Card className="w-full p-7">
                        <h3 className="text-2xl font-bold mb-7">Star History</h3>
                        {repoInfo && (
                            <Line options={{
                                datasets: {
                                    line: {
                                        tension: 0.4,
                                    },
                                },
                                scales: {
                                    x: {
                                        grid: {
                                          display: false
                                        }
                                    },
                                    y: {
                                        grid: {
                                          display: false
                                        }
                                    },
                                }
                            }} data={repoInfo.stars} />
                        )}
                    </Card>
                    <Card className="w-full p-7 ml-5">
                        <h3 className="text-2xl font-bold mb-7">Languages</h3>
                        {repoInfo && (
                            <Doughnut data={repoInfo.languages} />
                        )}
                    </Card>
                </div>
            </div>
        </section>
    )
}
