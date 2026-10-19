export type ProjectCategory = 'professional'|'analytics'|'academic';
export type Project = {
  slug: string; title: string; eyebrow: string; category: ProjectCategory; description: string; problem: string; approach: string; role: string; results: string;
  tools: string[]; stages: string[]; challenges: string[]; lessons: string[]; visual: 'identity'|'warehouse'|'segments'|'activity'|'compliance'|'migration'|'tokens'|'insights';
  image?:string; original?:string; repository?:string; caseStudy?:string;
};
// PUBLIC PROJECTS ONLY. Professional and unpublished case studies are archived under drafts/.
export const projects: Project[] = [
  {
    slug:'pizza-sales-analytics', title:'Pizza Sales Analytics', eyebrow:'Independent project · Power BI & SQL', category:'analytics',
    description:'An end-to-end Power BI study of 50,000+ pizza sales records, 15+ KPIs, peak-order periods and menu performance.',
    problem:'Turn transaction records into evidence for staffing, product performance and inventory decisions.',
    approach:'Used SQL Server, Power Query, relational modeling and DAX measures to analyze sales, orders and product demand.',
    role:'Independent ETL, data modeling, Power BI dashboard development and seven business recommendations.',
    results:'Revealed lunch/evening demand peaks, product rankings and ~$38.30 average order value; proposed seven operational improvements (3% projected, not realized growth).',
    tools:['Power BI','SQL Server','Power Query','DAX','Excel'],
    stages:['Prepare transactions','Model order data','Build DAX measures','Analyze sales'],
    challenges:['Converting transactional data into well-defined business KPIs'],lessons:['Keep assumptions separate from confirmed outcomes.'],
    visual:'insights',image:'apizza.webp',repository:'https://github.com/rmpranto/Pizza-Sales-Dashboard_PowerBI-MSSQL'
  },
  {
    slug:'spotify-streaming-analysis', title:'Spotify Streaming Analysis', eyebrow:'Independent project · Power BI', category:'analytics',
    description:'An interactive #DataDNA Power BI report comparing Spotify track rankings with dynamic Top N selections and Deneb visuals.',
    problem:'Compare music-streaming patterns across time periods and identify leading tracks.',
    approach:'Built dynamic Top N selection, Deneb heatmaps and unit charts, HTML visuals and custom report presentation.',
    role:'Independent Power BI report design, dashboard interaction and data storytelling.',
    results:'Delivered a challenge dashboard with dynamic rankings, Deneb heatmaps, unit charts and cover-art visuals.',
    tools:['Power BI','DAX','Deneb','HTML visuals','PowerPoint'],
    stages:['Explore tracks','Define rankings','Develop Deneb visuals','Present trends'],
    challenges:['Making streaming comparisons easy to explore'],lessons:['Custom visuals work best when metrics remain interpretable.'],
    visual:'insights',image:'spotify.webp',repository:'https://github.com/rmpranto/My_Personal_Projects/tree/master/Spotify%20Most%20Streamed%20Songs_PowerBI'
  },
  {
    slug:'maven-market-analysis', title:'Maven Market Analysis', eyebrow:'Independent project · Power BI', category:'analytics',
    description:'A three-page retail BI report connecting executive sales KPIs with detailed product profitability and customer analysis.',
    problem:'Help a fictional retailer explore revenue and margin performance across products, locations and customer groups.',
    approach:'Transformed data with Power Query, modeled related tables and created DAX measures for revenue, margins, returns and targets.',
    role:'Independent Power BI modeling, KPI definitions and summary/product/customer report design.',
    results:'Built linked Summary, Product Details and Customer Details pages with target comparisons and demographic drill-through.',
    tools:['Power BI','Power Query','DAX','Data modeling','Excel'],
    stages:['Transform datasets','Build relationships','Define retail KPIs','Create three pages'],
    challenges:['Keeping target and period comparisons consistent'],lessons:['Reliable comparisons depend on a clear model and consistent definitions.'],
    visual:'insights',image:'maven.webp',repository:'https://github.com/rmpranto/My_Personal_Projects/tree/master/Maven%20Market%20Analysis%20Report-PowerBI'
  },
  {
    slug:'road-accident-analysis', title:'Road Accident Analysis', eyebrow:'Independent project · Microsoft Excel', category:'analytics',
    description:'An Excel-only dashboard exploring 2021–2022 accident casualties by vehicle, road condition and month using Pivot Tables and slicers.',
    problem:'Identify important road-safety patterns within a historical accident dataset.',
    approach:'Cleaned and categorized data, used calculated columns, Pivot Tables, charts, slicers and timeline filters in Excel.',
    role:'Independent Excel data cleaning, analytical summaries and interactive dashboard development.',
    results:'Summarized 417,883 historical dataset casualties, including yearly totals and vehicle-specific breakdowns—not live accident statistics.',
    tools:['Microsoft Excel','Pivot Tables','Power Query','Excel Charts','Slicers'],
    stages:['Clean data in Excel','Create pivots','Compare casualties','Build dashboard'],
    challenges:['Comparing casualty distributions across different dimensions'],lessons:['Clearly label the dataset scope and period of any safety statistics.'],
    visual:'insights',image:'road.webp'
  },
  {
    slug:'adventure-works-report', title:'Adventure Works Report', eyebrow:'Independent project · Power BI', category:'analytics',
    description:'An end-to-end AdventureWorks Cycles Power BI certification project spanning data modeling, DAX, forecasting and sales KPIs.',
    problem:'Translate raw business datasets into a model and interactive report for revenue, profit, returns and regional trends.',
    approach:'Transformed and modeled data in Power BI, developed DAX measures and used filters, forecasts and AI-assisted visuals.',
    role:'Independent business-intelligence project: modeling, measures, reporting and analytical insights.',
    results:'Designed interactive revenue, profit, returns and regional/product analysis for the fictional business case.',
    tools:['Power BI','DAX','Power Query','SQL Server','Data modeling'],
    stages:['Transform raw data','Model facts & dimensions','Calculate KPIs','Build Power BI reports'],
    challenges:['Combining multiple business KPIs in one coherent model'],lessons:['Strong relationships and business definitions matter more than decorative visuals.'],
    visual:'insights',image:'awreport.webp',repository:'https://github.com/rmpranto/My_Personal_Projects/tree/master/AdventureWorks%20Cycles%20Report-PowerBI'
  },
  {
    slug:'car-transport-management', title:'Car Transport Management System', eyebrow:'Academic project · Oracle database', category:'academic',
    description:'A team-led Oracle database project involving ER modeling, 3NF normalization and 100+ SQL statements for transport operations.',
    problem:'Represent transport operations accurately with consistent relational records.',
    approach:'Led schema and ER modeling, normalization to 3NF, implementation of 100+ DDL/DML SQL statements and documentation.',
    role:'Four-person team lead, entity-relationship design, Oracle SQL and technical documentation.',
    results:'Delivered and documented a functioning academic relational database project.',
    tools:['Oracle 10g','SQL','ERD','Normalization','Database documentation'],
    stages:['Identify entities','Design ER diagram','Normalize schema','Implement SQL'],
    challenges:['Maintaining referential integrity while modeling multiple entities'],lessons:['Clear schema design pays off before writing complex SQL.'],
    visual:'warehouse',image:'car.webp',repository:'https://github.com/rmpranto/My_Personal_Projects/tree/master/Car%20Transport%20Management%20System_SQL_Oracle'
  },
  {
    slug:'helping-hand',title:'Helping Hand (Charity)',eyebrow:'Academic project · Web & requirements',category:'academic',
    description:'An undergraduate charity-management web project supported by a 51-page SRS, UML/ER modeling and Scrum teamwork.',
    problem:'Make donation and charity-service workflows easier to specify, manage and use.',
    approach:'Worked on a 51-page SRS, requirements gathering, risk analysis, UML/ER models, test cases, Scrum planning and web interfaces.',
    role:'Academic group collaboration across requirements, system design, documentation and frontend contributions.',
    results:'Produced a documented charity-management project and practical software-engineering deliverables.',
    tools:['HTML','CSS','JavaScript','PHP','MySQL','UML','Scrum'],
    stages:['Gather requirements','Write SRS','Design UML & ERD','Implement web flows'],
    challenges:['Connecting functional requirements and security considerations'],lessons:['Clear documentation helps a team build the right features.'],
    visual:'insights',image:'charity.webp'
  },
  {
    slug:'library-management-system',title:'Library Management System',eyebrow:'Academic project · C# application',category:'academic',
    description:'A C# Windows Forms library and bookshop application integrating relational databases and 15+ admin/customer features.',
    problem:'Manage book inventory, loans, orders and related records through a database-backed desktop interface.',
    approach:'Developed C# Windows Forms interfaces integrated with MySQL and SQL Server, supporting role-based CRUD and transactions.',
    role:'Academic desktop application development, database integration and implementation of 15+ documented functions.',
    results:'Built a working academic library/bookshop workflow for admins and customers.',
    tools:['C#','Windows Forms','MySQL','SQL Server','CRUD'],
    stages:['Define roles','Design screens','Connect databases','Implement modules'],
    challenges:['Keeping records and transactions consistent across application modules'],lessons:['Database design and interface workflow must be developed together.'],
    visual:'warehouse',image:'library.webp',repository:'https://github.com/rmpranto/Library-Management-System'
  }
];
export const featuredProjects = projects.slice(0,6);
export const publicProjects = projects;
export const findProject=(slug:string)=>projects.find(p=>p.slug===slug);
export const experiences = [
 {date:'Feb 2026 — Present',role:'Data Analyst',org:'V2 Technologies Ltd.',overview:'Maintain production PostgreSQL databases and reliable analytics pipelines for an enterprise CRM platform, combining operational database management, data quality, documentation and analytical engineering work.',highlights:[
  'Manage production PostgreSQL operations, investigate data quality issues and support BigQuery campaign reporting and analytics.',
  'Developed multi-method consumer identity profiling across millions of contact records using SQL, Python, fuzzy matching, consumer attributes and location signals to investigate likely duplicate patterns.',
  'Handled large-volume PostgreSQL database migration with pg_dump, pg_restore, scripted workflows, compatibility checks and integrity validation.',
  'Developed batch-cleanup and partition-maintenance procedures and investigated database performance, indexing and query optimization.',
  'Reconciled PostgreSQL contact and survey records with BigQuery fact, dimension and datamart tables; investigated discrepancies and backfilled missing survey data.',
  'Documented ECRM database tables, relationships, data dependencies and workflows; guided three interns and one teammate transitioning into the work.'
 ],tools:['PostgreSQL','BigQuery','SQL','Python','Database administration','Data quality']},
 {date:'Aug 2025 — Feb 2026',role:'Junior Data Analyst',org:'V2 Technologies Ltd.',overview:'Built analytical reporting and segmentation dashboards, translating stakeholder requirements into tested datasets and repeatable workflows.',highlights:[
  'Built a multi-page consumer segmentation dashboard with BigQuery SQL and Looker Studio for analysis of consumer groups and campaign targeting.',
  'Developed campaign, consumer-behavior and field-performance dashboards with interactive filters, KPI definitions and analytical reporting datasets.',
  'Improved ETL data quality through SQL/Python cleaning, structured transformation and validation checks; automated recurring data workflows.',
  'Translated client and operational requirements into analytical datasets and tested dashboards.'
 ],tools:['BigQuery','Looker Studio','SQL','Python','ETL']},
 {date:'Feb 2025 — Aug 2025',role:'Data Analyst Intern',org:'V2 Technologies Ltd.',overview:'My transition into industry work began with SQL reporting and an early BIDA dashboard assignment, then expanded into enterprise CRM reporting.',highlights:[
  'Produced more than 15 SQL reports spanning campaigns, call check-back and live observation for the enterprise CRM project.',
  'Built more than five interactive Looker Studio dashboards to monitor campaigns and consumer engagement, following the initial BIDA dashboard assignment.'
 ],tools:['SQL','Looker Studio','Operational reporting']},
 {date:'Jan 2022 — Apr 2022',role:'Teaching Assistant',org:'American International University–Bangladesh',overview:'Supported practical database teaching during my undergraduate years.',highlights:[
  'Helped 40 students understand database concepts and reviewed over 100 Oracle SQL queries and lab assignments.'
 ],tools:['Oracle SQL','Teaching','RDBMS']}
];
export const skills = [
 {name:'Analytics & business intelligence',list:['Looker Studio','Power BI','Microsoft Excel','Google Sheets','Power Query','DAX','KPI dashboards','Statistics','Exploratory analysis','EDA','Excel Pivot Tables'],use:'Interactive reporting, metric definitions and analytical narratives.'},
 {name:'Databases & cloud',list:['PostgreSQL','Google BigQuery','SQL Server','MySQL','Oracle 10g','Snowflake'],use:'Relational modeling, production querying and reporting warehouse operations.'},
 {name:'Programming & automation',list:['SQL','Python','pandas','PowerShell','ETL scripting','Transformations','Workflow automation'],use:'Repeatable data preparation, QA and operational processing.'},
 {name:'Database administration',list:['Backup / restore','Migration','Query tuning','Indexing','Partition maintenance','Stored procedures','Database troubleshooting'],use:'Maintenance, continuity and reliability for growing production datasets.'},
 {name:'Data & business analysis',list:['Data modeling','Data reconciliation','Consumer profiling','Fuzzy matching','Segmentation','CRM analytics','Campaign reporting'],use:'Turning complex business requirements into trustworthy analytical logic.'},
 {name:'Development & collaboration',list:['Git','GitHub','Jira','ClickUp','Trello','Requirements analysis','HTML/CSS (academic)'],use:'Versioning, documentation, coordinated delivery and review.'},
 {name:'Documentation & methods',list:['Schema documentation','Workflow documentation','RDBMS','SDLC','UML','SQA','Manual testing','IoT','Agile','Canva','Filmora'],use:'Engineering foundations and documented operating procedures.'},
 {name:'AI-assisted tools',list:['ChatGPT','Claude','Technical research','SQL review','Documentation support'],use:'AI-assisted research and review with human verification.'}
];
export type Credential={name:string,issuer:string,url?:string; image?:string};
export const credentials: Credential[] = [
 {name:'DataCamp Certified Data Analyst Associate',issuer:'DataCamp',url:'https://www.datacamp.com/certificate/DAA0018970684743',image:'/assets/certifications/dca2.webp'},
 {name:'Associate Data Analyst in SQL',issuer:'DataCamp',url:'https://www.datacamp.com/completed/statement-of-accomplishment/track/3615750876ff40f368c47fcebcaaee4fec7d1cf8',image:'/assets/certifications/Asql.webp'},
 {name:'Associate Data Engineer in SQL',issuer:'DataCamp',url:'https://www.datacamp.com/completed/statement-of-accomplishment/track/6f8f039f541652270ba6fcc787ebf50cdc6a25b9',image:'/assets/certifications/Esql.webp'},
 {name:'Microsoft Power BI Data Analyst Specialization',issuer:'Coursera / Microsoft',url:'https://coursera.org/share/20f80b695587eeaeb9c31d2754913629',image:'/assets/certifications/Data.webp'},
 {name:'Microsoft Power BI Desktop for Business Intelligence',issuer:'Udemy',url:'https://www.udemy.com/certificate/UC-4f558d6e-df0f-4243-bf7e-44c432a1dd73/',image:'/assets/certifications/pbid.webp'},
 {name:'Microsoft Excel — Excel from Beginner to Advanced',issuer:'Udemy',url:'https://www.udemy.com/certificate/UC-04eb02c4-8a3e-44e2-ac55-58fee6041ee6/',image:'/assets/certifications/excel.webp'},
 {name:'The Complete Python Bootcamp From Zero to Hero in Python',issuer:'Udemy',url:'https://www.udemy.com/certificate/UC-24db9490-32c7-45a5-b213-996ce6d4865b/',image:'/assets/certifications/zpython.webp'},
 {name:'Looker Studio / Google Data Studio Complete Advanced Tutorial',issuer:'Udemy',url:'https://www.udemy.com/certificate/UC-e5e10e9e-a481-4ca9-be08-0dc8ed9b11b0/',image:'/assets/certifications/looker.webp'},
 {name:'Microsoft Excel: Business Intelligence with Power Query & DAX',issuer:'Udemy',url:'https://www.udemy.com/certificate/UC-baa54277-f6f1-4a85-a5ec-e4631ed232f0/',image:'/assets/certifications/uc_excel.webp'},
 {name:'Introduction to Data and Data Science',issuer:'365 Data Science',image:'/assets/certifications/intro_data.webp'},
 {name:"The Data Scientist's Toolbox",issuer:'Coursera',url:'https://www.coursera.org/account/accomplishments/verify/PRSN5VPJLX7B',image:'/assets/certifications/tdst.webp'},
 {name:'Software Testing & Quality Assurance',issuer:'BITM',url:'https://drive.google.com/file/d/1nOx-h7lmbaj3Oa6i96n82W_mHeYhuQxb/view?usp=sharing',image:'/assets/certifications/1sqa.webp'}
];
export const education = [
 {period:'2018 — 2023',degree:'B.Sc. in Computer Science & Software Engineering',school:'American International University–Bangladesh',detail:'CGPA 3.31 · Graduated March 2023'},
 {period:'2015 — 2017',degree:'Higher Secondary Certificate · Science',school:'Govt. Ananda Mohan College, Mymensingh',detail:'Preserved from existing public portfolio'},
 {period:'2007 — 2015',degree:'Secondary School Certificate · Science',school:'Mymensingh Zilla School',detail:'Preserved from existing public portfolio'}
];
