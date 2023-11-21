import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import githubUsernameRegex from 'github-username-regex';

export default function RepoInput() {
    const [error, setError] = React.useState<string | null>(null);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let repo = (e.target as HTMLFormElement).repo.value;
        let split = repo.split('/');
        if (split.length !== 2) {
            setError('Invalid repository name (username/repository)');
            return false;
        }

        if (!githubUsernameRegex.test(split[0])) {
            setError('Invalid username');
            return false;
        }

        if (!githubUsernameRegex.test(split[1])) {
            setError('Invalid repository name');
            return false;
        }

        setError(null);
        window.location.href = `/${split[0]}/${split[1]}`;
        return true;
    }

    return (
        <>
            <form onSubmit={onSubmit} className="flex w-1/4 mt-5 items-center space-x-2 relative">
                <Input autoFocus name="repo" data-aos="fade-up" data-aos-delay="400" className="font-bold" type="text" placeholder="username/repository" />
                <Button data-aos="fade-up" data-aos-delay="500" type="submit">Search!</Button>
            </form>
            {error && <span className="mt-2 text-red-500 text-sm">{error}</span>}
        </>
    )
}
