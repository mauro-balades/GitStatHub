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
    RadialLinearScale
} from 'chart.js';
import { Line, Doughnut, PolarArea } from "react-chartjs-2";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
            RadialLinearScale
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
            <div className="mx-auto relative">
                <div className="w-full mb-10">
                    <h1 data-aos="fade-up" data-aos-delay="400" className="text-3xl font-bold">Stats for {username} / {repo}</h1>
                </div>
                <div className="flex w-full mb-10 justify-between">
                    <Card data-aos="fade-up" data-aos-delay="500" className="w-[270px] h-32 p-5">
                        <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                            <h3 className="text-2xl">Issues</h3>
                        </div>
                        <p className="text-5xl font-bold">{repoInfo?.issues}</p>
                    </Card>
                    <Card data-aos="fade-up" data-aos-delay="550" className="w-[270px] h-32 p-5">
                        <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                            </svg>
                            <h3 className="text-2xl">Pull Requests</h3>
                        </div>
                        <p className="text-5xl font-bold">{repoInfo?.pullRequests}</p>
                    </Card>
                    <Card data-aos="fade-up" data-aos-delay="600" className="w-[270px] h-32 p-5">
                        <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                            </svg>
                            <h3 className="text-2xl">Forks</h3>
                        </div>
                        <p className="text-5xl font-bold">{repoInfo?.forks}</p>
                    </Card>
                    <Card data-aos="fade-up" data-aos-delay="600" className="w-[270px] h-32 p-5">
                        <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                            </svg>
                            <h3 className="text-2xl">Subscribers</h3>
                        </div>
                        <p className="text-5xl font-bold">{repoInfo?.subscribers}</p>
                    </Card>
                </div>
                <div className="flex w-full">
                    <Card data-aos="fade-up" data-aos-delay="700" className="w-[900px] relative h-96 p-7 pb-20 pr-8">
                        <h3 className="text-2xl font-bold mb-5">Star History</h3>
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
                                },
                                maintainAspectRatio: false,

                            }} data={repoInfo.stars} />
                        )}
                    </Card>
                    <div>
                        <Card data-aos="fade-up" data-aos-delay="800" className="p-7 ml-5 w-56">
                            <h3 className="text-2xl font-bold mb-7">Languages</h3>
                            {repoInfo && (
                                <PolarArea data={repoInfo.languages} options={{
                                    datasets: {
                                        polarArea: {
                                            borderWidth: 1,
                                        },
                                    }, 
                                    scales: {
                                        r: {
                                            pointLabels: {
                                                display: false
                                            },
                                            ticks: {
                                                display: false,
                                            },
                                        }
                                    },
                                }} />
                            )}
                        </Card>
                        <hr data-aos="fade-up" data-aos-delay="850" className="mb-5 mt-7 h-2 ml-5 w-56" />
                        <Link target='_blank' href={`https://github.com/${username}/${repo}`}>
                            <Button data-aos="fade-up" data-aos-delay="900" className="ml-5 w-56">Visit Repo</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
