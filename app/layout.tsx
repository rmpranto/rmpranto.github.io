import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header, ResumeModal, ConditionalFooter, BackToTop, DataIntro } from '@/components/Interface';
import { site } from '@/lib/site';
export const metadata:Metadata={
 title:{default:'Rahat Maksud Pranto — Data Analyst',template:'%s | Rahat Maksud Pranto'},
 description:site.description,
 metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://rmpranto.github.io'),
 openGraph:{title:'Rahat Maksud Pranto — Data Analyst',description:site.description,type:'website',url:process.env.NEXT_PUBLIC_SITE_URL || 'https://rmpranto.github.io'},
 alternates:{canonical:'/'},
 icons:{icon:[{url:"/favicon-32x32.png?v=15",sizes:"32x32",type:"image/png"},{url:"/favicon.ico?v=15",sizes:"any",type:"image/x-icon"}],shortcut:"/favicon.ico?v=15",apple:"/apple-icon.png?v=15"},
 robots:{index:true,follow:true}
};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#071D17'};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en" data-theme="dark" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{__html:`try{var t=localStorage.getItem('rmp-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){}`}}/></head><body><DataIntro/><a href="#main" className="skip-link">Skip to main content</a><Header/><main id="main">{children}</main><ConditionalFooter/><ResumeModal/><BackToTop/></body></html>;
}
