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
import { Badge } from '@/components/ui/badge';

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
            <div className="mx-auto relative mt-[300px] pb-16">
                <div className="w-full mb-10">
                    <h1 data-aos="fade-up" data-aos-delay="400" className="text-3xl font-bold">Stats for {username} / {repo}</h1>
                </div>
                <div className="flex w-full justify-between pb-10">
                    <Card data-aos="fade-up" data-aos-delay="500" className="p-5">
                        <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                            </svg>
                            <h3 data-aos="fade-up" data-aos-delay="550" className="text-2xl font-bold">Quick Links</h3>
                        </div>
                        <div className="flex flex-col mt-5 w-80">
                            <Link data-aos="fade-up" data-aos-delay="600" target='_blank' href={`https://github.com/${username}/${repo}/contributors`} className='w-full mb-2 rounded-md bg-blue-300 hover:bg-blue-400 flex items-center p-2 px-4 text-black'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>
                                <div className="text-base font-semibold">Contributors</div>
                                <Badge className="ml-auto font-xs bg-black text-white hover:bg-black">{repoInfo?.contributors}</Badge>
                            </Link>
                            <Link data-aos="fade-up" data-aos-delay="650" target='_blank' href={`https://github.com/${username}/${repo}/releases`} className='w-full mb-2 rounded-md bg-purple-300 hover:bg-purple-400 flex items-center p-2 px-4 text-black'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                                </svg>
                                <div className="text-base font-semibold">Releases</div>
                                <Badge className="ml-auto font-xs bg-black text-white hover:bg-black">{repoInfo?.releases}</Badge>
                            </Link>                
                            <Link data-aos="fade-up" data-aos-delay="700" target='_blank' href={`https://github.com/${username}/${repo}/branches`} className='w-full mb-2 rounded-md bg-pink-300 hover:bg-pink-400 flex items-center p-2 px-4 text-black'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                                <div className="text-base font-semibold">Branches</div>
                                <Badge className="ml-auto font-xs bg-black text-white hover:bg-black">{repoInfo?.branches}</Badge>
                            </Link>     
                            <Link data-aos="fade-up" data-aos-delay="750" target='_blank' href={`https://github.com/${username}/${repo}/tags`} className='w-full mb-2 rounded-md bg-yellow-200 hover:bg-yellow-300 flex items-center p-2 px-4 text-black'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                                </svg>
                                <div className="text-base font-semibold">Tags</div>
                                <Badge className="ml-auto font-xs bg-black text-white hover:bg-black">{repoInfo?.tags}</Badge>
                            </Link> 
                        </div>
                    </Card>
                </div>
                <div className="flex w-full mb-10 justify-between">
                    <Card data-aos="fade-up" data-aos-delay="800" className="w-[270px] h-32 p-5">
                        <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                            <h3 className="text-2xl">Issues</h3>
                        </div>
                        <p className="text-5xl font-bold">{repoInfo?.issues}</p>
                    </Card>
                    <Card data-aos="fade-up" data-aos-delay="850" className="w-[270px] h-32 p-5">
                        <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                            </svg>
                            <h3 className="text-2xl">Pull Requests</h3>
                        </div>
                        <p className="text-5xl font-bold">{repoInfo?.pullRequests}</p>
                    </Card>
                    <Card data-aos="fade-up" data-aos-delay="900" className="w-[270px] h-32 p-5">
                        <div className="flex items-center mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                            </svg>
                            <h3 className="text-2xl">Forks</h3>
                        </div>
                        <p className="text-5xl font-bold">{repoInfo?.forks}</p>
                    </Card>
                    <Card data-aos="fade-up" data-aos-delay="950" className="w-[270px] h-32 p-5">
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
                    <Card data-aos="fade-up" data-aos-delay="1000" className="w-[900px] relative h-96 p-7 pb-20 pr-8">
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
                        <Card data-aos="fade-up" data-aos-delay="1050" className="p-7 ml-5 w-56">
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
                        <hr data-aos="fade-up" className="mb-5 mt-7 h-2 ml-5 w-56" />
                        <Link target='_blank' href={`https://github.com/${username}/${repo}`}>
                            <Button data-aos="fade-up" className="ml-5 w-56">Visit Repo</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
