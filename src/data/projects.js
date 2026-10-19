import ilmImg from '../assets/work/ilm-smart-academy.webp';
import snaxiaImg from '../assets/work/snaxia.webp';
import dudexaiImg from '../assets/work/dudexai.webp';
import gvImg from '../assets/work/gv-milk-agency.png';

export const projects = [
  {
    id: 'ilm-smart-academy',
    name: 'ILM Smart Academy',
    industry: 'Education',
    type: 'Website',
    summary: "We designed and built the academy's website so parents can see courses, faculty and reviews in one place and book a free trial in a single step.",
    description: "We designed and built the academy's website so parents can see courses, faculty and reviews in one place and book a free trial in a single step. Classes from 1st to 12th across CBSE, Matriculation and Samacheer Kalvi are laid out clearly.",
    result: 'Free-trial booking now open around the clock',
    image: ilmImg,
    hasScreenshot: true,
    buttonText: 'Start a similar project'
  },
  {
    id: 'snaxia',
    name: 'Snaxia',
    industry: 'Food and beverage',
    type: 'Website',
    summary: 'We built a bright, fast website that shows the full menu, both branch locations and customer reviews, with ordering one tap away.',
    description: "We built a bright, fast website that shows the full menu, both branch locations and customer reviews, with ordering one tap away. The look follows the shop's own playful identity.",
    result: '100+ drinks and 2 branches, all discoverable online',
    image: snaxiaImg,
    hasScreenshot: true,
    buttonText: 'Start a similar project'
  },
  {
    id: 'gv-milk-agency',
    name: 'G. V. Milk Agency',
    industry: 'Commercial Distribution',
    type: 'Web application',
    summary: 'Centralized billing and daily dispatch platform tracking shop distribution, brands, and real-time revenue.',
    description: 'We built a streamlined billing and daily distribution management portal for G. V. Milk Agency. The system automates shop dispatch entries, tracks multi-brand dairy inventory, calculates orders instantly, and provides real-time revenue analytics across daily, weekly, and monthly cycles.',
    result: 'Automated daily shop billing and zero-delay dispatch tracking',
    image: gvImg,
    hasScreenshot: true,
    buttonText: 'Start a similar project'
  },
  {
    id: 'workforce-crm',
    name: 'Workforce CRM',
    industry: 'Retail operations',
    type: 'Web application',
    summary: 'Multi-outlet dry cleaning and laundry chain',
    description: 'A secure manager console for outlet attendance, geospatial check-ins and automated payroll. Managers see who is on site, and payroll is calculated from verified hours instead of paper registers.',
    result: 'Attendance to payroll, with no manual calculation',
    image: null,
    hasScreenshot: false,
    buttonText: 'Start a similar project'
  },
  {
    id: 'dudexai',
    name: 'DudexAI',
    industry: 'Startup tools',
    type: 'In-house product',
    summary: 'Founders describe their vision and DudexAI returns an actionable plan, organised tasks and a clear roadmap.',
    description: 'Founders describe their vision and DudexAI returns an actionable plan, organised tasks and a clear roadmap. It is the product we are building ourselves, and the best proof of what we can build for you.',
    result: 'From idea to roadmap in one conversation',
    image: dudexaiImg,
    hasScreenshot: true,
    buttonText: 'Talk to us about it'
  }
];

export default projects;
