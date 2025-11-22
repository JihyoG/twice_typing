import Layout from "@/components/Layout";
import TypingGame from "@/components/TypingGame";

export default function Home() {
  return (
    <Layout>
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-magenta to-apricot mb-2 animate-slide-up">
          TWICE TYPING
        </h1>
        <p className="text-deep-purple/60 font-medium animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Test your speed with K-pop style!
        </p>
      </div>
      
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <TypingGame />
      </div>
    </Layout>
  );
}
