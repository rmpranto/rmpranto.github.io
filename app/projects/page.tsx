import type {Metadata} from 'next';
import { FilteredProjectGrid } from '@/components/Interface';
export const metadata:Metadata={title:'Major Project Experiences — Independent & Academic Work'};
export default function ProjectsPage(){return <div className="container interior-page"><header className="interior-head"><span className="eyebrow">PROJECT ARCHIVE / VERIFIED PUBLIC WORK</span><h1>Major Project <em>Experiences.</em></h1><p>Selected independent analytics and academic projects, with the original public project images, methods and findings.</p></header><FilteredProjectGrid/></div>}
