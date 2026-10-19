/** Public-facing project narratives, cross-checked against the eight published pages
 * at rmpranto.github.io/project-details/. These describe academic/sample datasets,
 * not an independently measured client engagement or live production outcome.
 * Legacy template copy/paste errors and unsupported improvement percentages were omitted. */
export type PublicProjectDetail = {
  context: string;
  objectives: string[];
  workflow: string[];
  contributions: string[];
  findings: string[];
  outcome: string;
  resources?: { label: string; url: string }[];
  images: { filename: string; caption: string }[];
};

export const publicProjectDetails: Record<string, PublicProjectDetail> = {
  'pizza-sales-analytics': {
    context: 'This Maven Analytics challenge put me in the role of a business intelligence consultant for a fictional Greek-inspired pizza restaurant in New Jersey. The task was not simply to display sales: it was to use transactional data to investigate when orders arrived, which menu items were most popular, and how the business could plan staffing and inventory around demand.',
    objectives: [
      'Analyze more than 50,000 pizza sales records and distinguish high-volume products from slower sellers.',
      'Prepare and model the data in a reporting workflow using SQL Server, Power Query and Power BI.',
      'Build an interactive report with more than 15 KPIs, including order volume, sales and average order value.',
      'Translate trends in time and product performance into practical restaurant-operating recommendations.'
    ],
    workflow: [
      'Extracted and cleaned order and pizza-level datasets using SQL Server and Power Query, resolving the analytical structure before visual design.',
      'Created relationships across transaction and product information and defined DAX measures for consistent sales and demand calculations.',
      'Developed dashboard views that connected time-of-day and day-of-week demand with product-level performance and headline KPIs.',
      'Investigated busy service periods, popular pizza varieties and low-volume menu items to uncover planning opportunities.',
      'Translated the analysis into seven proposed changes focused on inventory, staffing and service efficiency.'
    ],
    contributions: [
      'Owned the workflow from data preparation through the Power BI report and interpretation, acting independently within the challenge scenario.',
      'Created more than 15 reporting KPIs and made the measures comparable across time and menu-item views.',
      'Presented operational recommendations as a separate judgment informed by the findings, rather than treating them as proven results.'
    ],
    findings: [
      'The strongest order periods in the published analysis were around 12–1 PM and 5–6 PM.',
      'Thursday, Friday and Saturday appeared among the busiest sales days. The original report noted approximately 2,520 pizzas in the Thursday-noon period across its analyzed data.',
      'Classic Deluxe was identified as the best-selling pizza; Brie Carre was among the lowest-volume offerings.',
      'The original project reported an average order value of approximately $38.30.',
      'Seven operational improvements were proposed, with an estimated 3% revenue opportunity. This was a projection, not measured revenue growth.'
    ],
    outcome: 'The completed Power BI report provided a single place to examine sales mix, timing and product demand. Its value is the decision framework and actionable hypotheses; the restaurant and proposed business impact are part of a fictional challenge, not a documented production deployment.',
    resources: [{ label: 'Open interactive Power BI dashboard', url: 'https://app.powerbi.com/view?r=eyJrIjoiYTdhNDIzZjYtNmY3Ny00MGQ4LWIzN2EtODgwYmRhZDg1YmI2IiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9&pageName=ReportSection' }],
    images: [{ filename: 'apizza.webp', caption: 'Pizza Sales Analytics — original Power BI dashboard' }, { filename: 'Pizza.webp', caption: 'Pizza Sales Analytics — original report view' }]
  },
  'spotify-streaming-analysis': {
    context: 'For the October 2023 #DataDNA challenge by OnyxData, I explored a dataset of Spotify’s most-streamed tracks of 2023. Rather than relying on a static ranking, I designed a report that allows readers to change the comparison period and explore leading songs and wider streaming patterns interactively.',
    objectives: [
      'Explore streaming activity and track popularity across release years and selected timeframes.',
      'Make it easy to compare leading tracks using a dynamic Top N control.',
      'Use custom visuals to communicate patterns beyond a conventional bar-chart dashboard.',
      'Build a cohesive interactive Power BI report that connects rankings, filters and track imagery.'
    ],
    workflow: [
      'Explored the provided challenge dataset and structured the comparisons needed for track rankings and time-based analysis.',
      'Designed interactive selections and a dynamic Top N slicer to change which tracks appear in the report.',
      'Built Deneb heatmap and unit-chart visuals to represent streaming patterns in more expressive ways.',
      'Used HTML visuals to display cover artwork and make the track-level experience easier to scan.',
      'Prepared custom report backgrounds in PowerPoint and brought the visuals together into a consistent dashboard.'
    ],
    contributions: [
      'Independently built the analytical report and its interactive exploration flow for the competition dataset.',
      'Combined Power BI controls with Deneb and HTML visuals instead of using only default chart types.',
      'Focused on maintaining readable comparisons even when Top N selections or filters changed.'
    ],
    findings: [
      'Interactive rankings identified which tracks led within the selected time period and release-year views.',
      'The custom heatmap and unit-chart designs helped expose changes in the relative concentration of streams.',
      'The report demonstrates an exploratory method for music data; it does not establish conclusions about the entire music-streaming industry.'
    ],
    outcome: 'The result was a visually rich Power BI dashboard for the DataDNA challenge, emphasizing exploratory analysis, custom visuals and data storytelling. It demonstrates how flexible controls can help an audience move beyond a single fixed music ranking.',
    resources: [{ label: 'Open interactive Power BI dashboard', url: 'https://app.powerbi.com/view?r=eyJrIjoiNWRhNDQ5MTEtMDJiMC00NzI1LThjMTgtYzFiYzhkNjJlMjM2IiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9' }],
    images: [{ filename: 'spotify.webp', caption: 'Spotify Streaming Analysis — original challenge report' }]
  },
  'maven-market-analysis': {
    context: 'I completed Maven Market Analysis as a bonus project in the Microsoft Power BI Desktop for Business Intelligence certification. Using the fictional retail dataset, I organized the reporting around three stakeholder questions: how the business is performing overall, which products drive results, and who its customers are.',
    objectives: [
      'Monitor sales, revenue, profit, transactions, margins, returns and business targets.',
      'Compare profitability and sales outcomes by product, brand and geography.',
      'Explore customer purchasing patterns using demographic and location segments.',
      'Deliver three connected Power BI pages with filtering and drill-through.'
    ],
    workflow: [
      'Connected to the supplied retail tables, checked data quality and applied transformations in Power Query.',
      'Built a relational model linking sales activity to products, customer attributes and location information.',
      'Created DAX calculations for revenue, profit margins, returns and comparisons with monthly targets.',
      'Designed an executive summary showing transactions, period comparisons, revenue trends and geographic performance.',
      'Developed dedicated product and customer pages for deeper investigation using interactive filters and drill-through.'
    ],
    contributions: [
      'Created the complete model and three-page report independently as part of the certification exercise.',
      'Designed the Product Details page to compare current-month profit and units sold against targets, while surfacing return-rate changes and leading brands.',
      'Used the Customer Details page to explore revenue and orders alongside occupation, gender, age and location groupings.'
    ],
    findings: [
      'The Summary page combined sales, profit, transactions, margin and returns with weekday/weekend and location-based comparisons.',
      'The Product Details page highlighted profit and unit targets, monthly returns, weekly profits and top-performing brands and products.',
      'The Customer Details page compared purchasing behavior and customer contribution by demographic group and location.',
      'These views demonstrate the analytical coverage of the sample dataset; they are not a report of actual changes to a retailer’s performance.'
    ],
    outcome: 'The deliverable was a complete three-page retail BI report with reusable DAX measures, a relational model and drill-through navigation. It strengthened the practical link between well-defined business metrics and effective dashboard design.',
    resources: [{ label: 'Open interactive Power BI dashboard', url: 'https://app.powerbi.com/view?r=eyJrIjoiMGI2NTIyZTUtZmQ0Ni00NmQ3LWEyMjEtMDI2ZGFlNDkzZTgyIiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9&pageName=ReportSection' }],
    images: [{ filename: 'maven.webp', caption: 'Maven Market — original Power BI dashboard' }, { filename: 'amaven.webp', caption: 'Maven Market — additional report overview' }]
  },
  'road-accident-analysis': {
    context: 'This independent Microsoft Excel project explored historical road-accident casualty records for 2021 and 2022. The aim was to move from a large, detailed spreadsheet to a dashboard where changes by month, vehicle type and road conditions could be understood quickly without mistaking a dataset summary for live national statistics.',
    objectives: [
      'Prepare and clean historical accident data for meaningful comparisons.',
      'Explore casualties by year, month, vehicle type, road type and surface condition.',
      'Build an Excel-native analytical workflow using Pivot Tables and charts.',
      'Make filtering interactive through slicers and a timeline control.'
    ],
    workflow: [
      'Defined the analysis scope, reporting questions and the categories needed for the dashboard.',
      'Cleaned inconsistent records and duplicates, and created calculated columns for time and casualty groupings.',
      'Aggregated the historical data using Excel Pivot Tables and summary calculations.',
      'Built visual comparisons of casualty counts across vehicles, years, months, roads and surface types.',
      'Connected charts to slicers and a timeline for interactive exploration inside Microsoft Excel.'
    ],
    contributions: [
      'Completed the data preparation, calculations and dashboard independently in Microsoft Excel—not Power BI.',
      'Selected comparable casualty measures across multiple dimensions and built interactive controls around them.',
      'Added scope-aware interpretation so historic dataset figures are not presented as real-time safety indicators.'
    ],
    findings: [
      'The published dashboard covered 417,883 casualties: 222,146 in 2021 and 195,737 in 2022.',
      'In the source analysis, cars accounted for 333,485 casualties (79.8%); the “other vehicles” group accounted for 3,424.',
      'November had the highest monthly casualty count in both years; February 2021 and January 2022 were identified as the lowest months.',
      'Single-carriageway roads carried the largest casualty count among the compared road types, while slip roads were lowest.',
      'The original dashboard found many casualties on dry road surfaces. Counts alone do not establish that a road condition causes accidents.'
    ],
    outcome: 'The Excel dashboard presented an accessible summary of this specific historical dataset, with dynamic filtering for closer analysis. The figures are reproduced as reported in the original project; they are not independently verified national accident statistics.',
    resources: [{ label: 'Open original Excel workbook', url: 'https://docs.google.com/spreadsheets/d/1aAGkMOQVaWdJ0qdo-s7O_Ks0YhfflRaS/edit?usp=sharing&ouid=108711721194870186550&rtpof=true&sd=true' }],
    images: [{ filename: 'road.webp', caption: 'Road Accident — original Microsoft Excel dashboard' }]
  },
  'adventure-works-report': {
    context: 'For the Microsoft Power BI Desktop for Business Intelligence certification, I worked with the fictional AdventureWorks Cycles business to build an end-to-end reporting solution. The project followed a complete BI path: turning source files into a relational model, defining meaningful KPIs and communicating performance through executive dashboards.',
    objectives: [
      'Transform the provided AdventureWorks business data into a reporting-ready model.',
      'Connect fact and dimension tables and calculate the main commercial KPIs.',
      'Analyze revenue, sales, profit, returns and regional and product-level trends.',
      'Create an interactive dashboard using forecasting and selected AI-assisted Power BI visuals.'
    ],
    workflow: [
      'Cleaned and shaped the supplied datasets in Power BI, preparing fields for consistent aggregation.',
      'Designed relationships between the report’s fact and dimension tables.',
      'Developed DAX calculations to track revenue, sales, profit and returns.',
      'Built an interactive management report with geographic and product-level comparisons.',
      'Explored forecasting and AI visuals to complement the standard KPI and trend reporting.'
    ],
    contributions: [
      'Independently performed data preparation, modeling, DAX and report design for the certification scenario.',
      'Brought multiple commercial metrics into a common report so performance could be compared using consistent calculations.',
      'Used forecasts and AI-supported visuals as exploratory aids rather than claiming a validated prediction system.'
    ],
    findings: [
      'The final report made revenue, sales, profit and return-rate KPIs available together.',
      'Regional and product-level comparisons supported exploration of stronger and weaker segments in the fictional dataset.',
      'Forecasting and AI-based visuals added exploratory perspectives, but no verified financial improvement is claimed.'
    ],
    outcome: 'The finished certification project demonstrates a complete Power BI workflow—from cleaning and modeling business data through executive reporting, exploratory visuals and KPI-based analysis for AdventureWorks Cycles.',
    resources: [{ label: 'Open interactive Power BI dashboard', url: 'https://app.powerbi.com/view?r=eyJrIjoiNWI5MTU5ZjMtZTM3ZC00MWNmLWE1NTktZTA1MGIxOGFkM2UwIiwidCI6ImZmNGU0YjE4LWRiOGYtNGE4Ny1iNzEzLTBlNWJkNTJiYjMwMCIsImMiOjEwfQ%3D%3D' }],
    images: [{ filename: 'awreport.webp', caption: 'AdventureWorks Cycles — original Power BI report' }, { filename: 'awrep.webp', caption: 'AdventureWorks Cycles — additional original report visual' }]
  },
  'car-transport-management': {
    context: 'During an undergraduate Introduction to Database course, I led a four-person team developing a Car Transport Management System. It was an academic relational-database project focused on translating vehicle-transport operations into a consistent schema with documented entities, relationships and SQL behavior.',
    objectives: [
      'Model the entities, relationships and constraints of a transport-management database.',
      'Apply normalization up to third normal form (3NF) to reduce redundancy.',
      'Implement the schema and essential data operations using SQL.',
      'Document the architecture and coordinate a collaborative academic delivery.'
    ],
    workflow: [
      'Identified the domain entities and the data relationships needed for transport records.',
      'Prepared a comprehensive Entity-Relationship diagram and translated it into relational tables.',
      'Normalized the schema up to 3NF where appropriate, paying attention to keys and integrity.',
      'Implemented more than 100 DDL/DML statements and queries, applying joins and SQL window functions where useful.',
      'Compiled development documentation explaining the schema and implementation decisions.'
    ],
    contributions: [
      'Led the four-person team, coordinating tasks and bringing the database design together.',
      'Worked on ER modeling, schema normalization and SQL implementation in the Oracle database context.',
      'Helped explain the technical decisions in the accompanying documentation.'
    ],
    findings: [
      'The group delivered a structured academic relational database for the car-transport scenario.',
      'Normalization and entity relationships were documented so that the underlying business records could be understood and extended.',
      'The project developed practical SQL and collaborative database-design skills; it was not a production transport platform.'
    ],
    outcome: 'The strongest outcome was the move from conceptual ER modeling to an implemented, documented relational database. The project strengthened both practical SQL skills and experience leading a small technical team.',
    images: [{ filename: 'car.webp', caption: 'Car Transport Management — original project overview' }, { filename: 'acar.webp', caption: 'Car Transport Management — additional original database visual' }]
  },
  'helping-hand': {
    context: 'Helping Hand was a team project in the undergraduate Software Project I course. The concept was a web-based charity-management platform connecting people, donation opportunities and charitable organizations. The focus was on requirements analysis, thoughtful software architecture and a documented implementation rather than a commercial launch.',
    objectives: [
      'Design a clear process for online charity and donation activities.',
      'Document functional requirements, stakeholders, risks and test scenarios.',
      'Model the application’s core relationships and user interactions.',
      'Consider donation transparency, secure payment processes and collaborative delivery.'
    ],
    workflow: [
      'Gathered requirements, analyzed risks and estimated project effort with the group.',
      'Co-authored a 51-page Software Requirements Specification (SRS) describing the proposed product and its functions.',
      'Created UML and Entity-Relationship diagrams to connect user behavior with the underlying data model.',
      'Documented test cases and worked within a Scrum-based development approach.',
      'Contributed to web interface development and documented payment security considerations, including PCI DSS-related requirements.'
    ],
    contributions: [
      'Contributed to translating the initial charity-service problem into software requirements and acceptance-oriented documentation.',
      'Participated in the UML/ER modeling, risk assessment, test planning and group work coordination.',
      'Helped turn the requirements into a usable academic web interface.'
    ],
    findings: [
      'The primary deliverable included a comprehensive 51-page SRS together with UML/ER design artifacts.',
      'The team developed an academic web-based charity-management interface and associated project documentation.',
      'The deliverables documented approaches to donation transparency, usability and payment security without a separately verified commercial impact measurement.'
    ],
    outcome: 'The project brought together software requirements engineering, documentation, Agile team collaboration and secure-payment design considerations. Its deliverables demonstrate the academic software-development process from requirements to interface implementation.',
    resources: [{ label: 'Read original project documentation', url: 'https://drive.google.com/file/d/1xA5HfdkGJ-hoywqCo3nMs7rN7JdmSn64/view?usp=sharing' }],
    images: [{ filename: 'charity.webp', caption: 'Helping Hand — original academic charity-platform visual' }]
  },
  'library-management-system': {
    context: 'For an undergraduate C# course, I developed a Windows Forms desktop application for library and bookshop operations. The work combined interface design and relational databases, with separate workflows for administrators managing the system and customers searching or purchasing books.',
    objectives: [
      'Create a database-backed desktop application with administrator and customer modules.',
      'Manage inventory, borrowing, purchasing, account records and transaction history.',
      'Implement connected user interfaces with CRUD operations and persistent records.',
      'Cover common library and bookshop workflows in a consistent system.'
    ],
    workflow: [
      'Designed the application screens and distinct role-based navigation in C# Windows Forms.',
      'Connected user-interface actions to MySQL and Microsoft SQL Server relational storage.',
      'Implemented more than 15 core functions supporting book records, transactions and account activity.',
      'Built administrator flows for student records, stock, loan lists, notifications, history and invoices.',
      'Added customer-facing book search by title, author or genre, purchase and deposit actions, order confirmation and receipt or invoice output.'
    ],
    contributions: [
      'Developed the Windows Forms application interface and its core database-backed workflows.',
      'Implemented and connected the separate administrator and customer modules.',
      'Practiced relational data operations, CRUD handling and transaction flows through a real desktop UI.'
    ],
    findings: [
      'The delivered academic desktop project covered more than 15 documented functions.',
      'Administrative screens supported inventory and loans alongside account records and financial history.',
      'Customer screens supported search, ordering, deposits and billing workflows.',
      'The project is evidence of application and database integration, rather than a claim of deployment to a public library.'
    ],
    outcome: 'The result was an end-to-end desktop demonstration of combining C#, Windows Forms and relational databases around practical library workflows, providing hands-on experience with application design, persistence and transactions.',
    images: [{ filename: 'library.webp', caption: 'Library Management System — original Windows Forms application' }]
  }
};
