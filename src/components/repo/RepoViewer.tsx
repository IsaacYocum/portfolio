import { FC } from 'react';
import RepoCard from './RepoCard';

type RepoViewerProps = { repos?: Array<any> | null };

const RepoViewer: FC<RepoViewerProps> = ({ repos }) => {
  return (
    <>
      {repos?.map((repo) => (
        <RepoCard key={repo.name} repo={repo} />
      ))}
    </>
  );
};

export default RepoViewer;
