import { useParams, Link } from 'react-router-dom';

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-accent-violet mb-4 font-heading">Course Detail</h1>
      <p className="text-slate-400 font-mono mb-6">Course ID: {courseId}</p>
      <Link to="/" className="text-accent-emerald hover:underline font-mono">&lt; Back to Home</Link>
    </div>
  );
}
