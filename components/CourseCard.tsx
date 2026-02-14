
import React from 'react';
import { Course } from '../types';
import { PlusCircle, Clock, BarChart } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    <div 
      onClick={() => onClick(course)}
      className="group bg-white p-5 rounded-3xl border border-slate-200 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300 cursor-pointer flex flex-col h-full relative overflow-hidden"
    >
      <div className="relative mb-5 h-44 w-full overflow-hidden rounded-2xl">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-indigo-600 tracking-wider shadow-sm">
          {course.category}
        </div>
      </div>

      <div className="flex-grow">
        <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                <BarChart size={12} />
                {course.level}
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                <Clock size={12} />
                12h 45m
            </span>
        </div>
        <h3 className="font-bold text-lg text-slate-800 leading-tight mb-3 line-clamp-2 h-14 group-hover:text-indigo-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            {course.description}
        </p>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-auto">
        <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium">Price</span>
            <span className="font-black text-xl text-slate-900">${course.price}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <PlusCircle size={22} />
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
