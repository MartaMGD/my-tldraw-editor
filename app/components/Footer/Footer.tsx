export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-12 bg-slate-900 flex items-center justify-center text-white text-md z-50">
      made by Marta González - Follow me{' '}
      <a
        className="hover:font-bold ml-1"
        href={'https://www.linkedin.com/in/martagonzalezduque/'}
        target="_blank"
        rel="noopener noreferrer"
      >
        on LinkedIn
      </a>
    </footer>
  );
}
