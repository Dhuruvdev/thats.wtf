import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Blog() {
  const posts = [
    {
      title: "How to Build Your Perfect Digital Presence",
      excerpt: "Learn the essential steps to create a stunning profile that converts visitors into followers.",
      date: "Dec 15, 2025",
      readTime: "5 min read",
      category: "Guide"
    },
    {
      title: "The Power of Progressive Profiles",
      excerpt: "Discover how gamified progression keeps your audience engaged and coming back for more.",
      date: "Dec 12, 2025",
      readTime: "7 min read",
      category: "Features"
    },
    {
      title: "Creator Stories: From Zero to 100K Followers",
      excerpt: "Real stories from creators who built their community using thats.wtf.",
      date: "Dec 10, 2025",
      readTime: "8 min read",
      category: "Stories"
    },
    {
      title: "Top 10 Profile Customization Trends in 2025",
      excerpt: "Explore the latest design trends that are making profiles stand out.",
      date: "Dec 8, 2025",
      readTime: "6 min read",
      category: "Trends"
    },
    {
      title: "Analytics Deep Dive: Understanding Your Metrics",
      excerpt: "Master your analytics and learn what metrics actually matter for growth.",
      date: "Dec 5, 2025",
      readTime: "9 min read",
      category: "Analytics"
    },
    {
      title: "Getting Started with Custom Domains",
      excerpt: "Step-by-step guide to connecting your custom domain to your thats.wtf profile.",
      date: "Dec 1, 2025",
      readTime: "4 min read",
      category: "Tutorial"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <main className="relative pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl font-display font-black text-white mb-4">
              Blog & Resources
            </h1>
            <p className="text-xl text-muted-foreground">
              Tips, stories, and insights for creators
            </p>
          </motion.div>

          {/* Blog Posts */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {posts.map((post, i) => (
              <motion.div key={i} variants={itemVariants}>
                <Card className="p-6 border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-primary/30 transition-all group hover-elevate cursor-pointer">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-black uppercase tracking-wider text-primary bg-primary/20 px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-display font-black text-white mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-primary flex-shrink-0 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
