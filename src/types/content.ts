export type ExamCategory = 'Banking' | 'SSC' | 'Railway' | 'Insurance' | 'Regulatory' | 'State-level';

export interface Exam {
  slug: string; name: string; shortName: string; category: ExamCategory; description: string;
  overview: string; eligibility: string[]; selectionProcess: string[];
  pattern: { stage: string; description: string }[]; syllabus: string[]; platformPath?: string;
}

export interface BlogPost {
  title: string; slug: string; description: string; date: string; updated?: string; author: string;
  category: string; tags: string[]; featuredImage?: string; published: boolean; featured?: boolean; body: string;
}
