<?php

namespace App\Http\Controllers;

use App\Models\profile;
use App\Models\skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SkillController extends Controller
{
    private $skillColors = [
        'bg-blue-100 text-blue-800',
        'bg-green-100 text-green-800',
        'bg-purple-100 text-purple-800',
        'bg-orange-100 text-orange-800',
        'bg-cyan-100 text-cyan-800',
        'bg-pink-100 text-pink-800',
        'bg-yellow-100 text-yellow-800',
        'bg-red-100 text-red-800'
    ];

    public function addSkill(Request $request)
    {
        $request->validate([
            'skill_name' => 'required|string|max:255',
        ]);

        $profile = Auth::user()->profile;
        
        // Cari atau buat skill
        $skill = Skill::firstOrCreate([
            'name' => $request->skill_name
        ]);

        // Cek apakah skill sudah ada di profile
        if ($profile->skills()->where('skill_id', $skill->id)->exists()) {
            return back()->withErrors(['skill' => 'Skill sudah ada dalam profil Anda']);
        }

        // Tambahkan skill ke profile dengan warna random
        $randomColor = $this->skillColors[array_rand($this->skillColors)];
        
        $profile->skills()->attach($skill->id, [
            'color' => $randomColor
        ]);

        return back()->with('success', 'Skill berhasil ditambahkan');
    }

    public function removeSkill(Request $request)
    {
        $request->validate([
            'skill_id' => 'required|exists:skills,id',
        ]);

        $profile = Auth::user()->profile;
        $profile->skills()->detach($request->skill_id);

        return back()->with('success', 'Skill berhasil dihapus');
    }

    public function getAvailableSkills()
    {
        $availableSkills = [
            'Account Management', 'Accounting', 'Adaptability', 'Agile', 'Android Development',
            'Ansible', 'Ant Design', 'API Development', 'Apache', 'Apache Spark',
            'Asana', 'ASP.NET', 'Audio Editing', 'Auditing', 'AWS',
            'Big Data', 'Blogging', 'Bookkeeping', 'Bootstrap', 'Brand Management',
            'Budget Management', 'Business Analysis', 'Canva', 'C++', 'C#',
            'Cassandra', 'Chakra UI', 'CodeIgniter', 'Cold Calling', 'Collaboration',
            'Communication', 'Computer Vision', 'Content Marketing', 'Content Writing', 'Cordova/PhoneGap',
            'Copywriting', 'CRM', 'Creativity', 'Critical Thinking', 'CSS',
            'Customer Retention', 'Customer Service', 'Cypress', 'Dart', 'Data Analysis',
            'Data Visualization', 'Deep Learning', 'Django', 'Docker', 'DynamoDB',
            'Email Marketing', 'Excel', 'Express.js', 'Facebook Ads', 'FastAPI',
            'Fiber', 'Figma', 'Firebase', 'Financial Analysis', 'Financial Planning',
            'Flutter', 'Framer', 'Git', 'GitHub', 'GitHub Actions',
            'GitLab', 'GitLab CI/CD', 'Gin', 'Go', 'Google Ads',
            'Google Analytics', 'Google Cloud', 'GraphQL', 'Hadoop', 'HTML',
            'HubSpot', 'iOS Development', 'InfluxDB', 'Instagram Marketing', 'Integration Testing',
            'InVision', 'Investment Analysis', 'Ionic', 'Java', 'JavaScript',
            'Jenkins', 'Jest', 'Jira', 'jQuery', 'Kanban',
            'Keras', 'Koa.js', 'Kotlin', 'Kubernetes', 'Laravel',
            'Leadership', 'Lead Generation', 'Less', 'LinkedIn Marketing', 'Linux',
            'Machine Learning', 'Marketing Automation', 'Material-UI', 'MATLAB', 'Mentoring',
            'Microservices', 'Microsoft Azure', 'Microsoft Teams', 'MongoDB', 'Monday.com',
            'MySQL', 'Natural Language Processing', 'Negotiation', 'NestJS', 'Neo4j',
            'Next.js', 'Nginx', 'Node.js', 'NumPy', 'Nuxt.js',
            'OpenCV', 'Oracle', 'Parcel', 'Pandas', 'Photography',
            'PHP', 'PostgreSQL', 'Presentation Skills', 'Principle', 'Problem Solving',
            'Product Management', 'Project Management', 'Proofreading', 'Prototyping', 'Public Speaking',
            'Python', 'PyTorch', 'QuickBooks', 'R', 'React',
            'React Native', 'Redis', 'REST API', 'Risk Management', 'Ruby',
            'Ruby on Rails', 'Rust', 'Sass/SCSS', 'Sales', 'Salesforce',
            'SAP', 'Scala', 'Scikit-learn', 'Scrum', 'SEO',
            'SEM', 'Selenium', 'Sketch', 'Slack', 'Social Media Marketing',
            'Software Architecture', 'Spring Boot', 'SQL', 'SQL Server', 'SQLite',
            'Stakeholder Management', 'Supabase', 'Svelte', 'Swift', 'System Design',
            'Tailwind CSS', 'Tax Preparation', 'Technical Writing', 'TensorFlow', 'Testing',
            'Terraform', 'Time Management', 'Training & Development', 'Translation', 'Trello',
            'TypeScript', 'UI/UX Design', 'Unit Testing', 'Usability Testing', 'User Research',
            'Vagrant', 'Video Editing', 'Vite', 'Vue.js', 'Webpack',
            'Wireframing', 'Xamarin'
        ];

        // Seed skills ke database jika belum ada
        foreach ($availableSkills as $skillName) {
            Skill::firstOrCreate(['name' => $skillName]);
        }

        return response()->json($availableSkills);
    }
}