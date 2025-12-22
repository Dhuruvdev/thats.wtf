import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function Terms() {
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-display font-black text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground mb-12">
              Last updated: December 21, 2025
            </p>

            <div className="space-y-8 prose prose-invert max-w-none">
              <section>
                <h2 className="text-2xl font-display font-black text-white mb-4">1. Agreement to Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using <span className="brand-text"><span className="brand-text-thats">thats</span><span className="brand-text-dot">.</span><span className="brand-text-wtf">wtf</span></span>, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-black text-white mb-4">2. Use License</h2>
                <p className="text-muted-foreground mb-2">
                  Permission is granted to temporarily download one copy of the materials (information or software) on <span className="brand-text"><span className="brand-text-thats">thats</span><span className="brand-text-dot">.</span><span className="brand-text-wtf">wtf</span></span> for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Modifying or copying the materials</li>
                  <li>Using the materials for any commercial purpose or for any public display</li>
                  <li>Attempting to reverse engineer any software contained on <span className="brand-text"><span className="brand-text-thats">thats</span><span className="brand-text-dot">.</span><span className="brand-text-wtf">wtf</span></span></li>
                  <li>Removing any copyright or other proprietary notations from the materials</li>
                  <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-black text-white mb-4">3. Disclaimer</h2>
                <p className="text-muted-foreground">
                  The materials on <span className="brand-text"><span className="brand-text-thats">thats</span><span className="brand-text-dot">.</span><span className="brand-text-wtf">wtf</span></span> are provided on an 'as is' basis. <span className="brand-text"><span className="brand-text-thats">thats</span><span className="brand-text-dot">.</span><span className="brand-text-wtf">wtf</span></span> makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-black text-white mb-4">4. Limitations</h2>
                <p className="text-muted-foreground">
                  In no event shall <span className="brand-text"><span className="brand-text-thats">thats</span><span className="brand-text-dot">.</span><span className="brand-text-wtf">wtf</span></span> or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on <span className="brand-text"><span className="brand-text-thats">thats</span><span className="brand-text-dot">.</span><span className="brand-text-wtf">wtf</span></span>, even if <span className="brand-text"><span className="brand-text-thats">thats</span><span className="brand-text-dot">.</span><span className="brand-text-wtf">wtf</span></span> or an authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-black text-white mb-4">5. User Conduct</h2>
                <p className="text-muted-foreground">
                  You agree not to engage in any conduct that restricts or inhibits anyone's use or enjoyment of <span className="brand-text"><span className="brand-text-thats">thats</span><span className="brand-text-dot">.</span><span className="brand-text-wtf">wtf</span></span>. Prohibited behavior includes: harassing or causing distress or inconvenience to any person, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-black text-white mb-4">6. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms of Service, please contact us at support@thats.wtf
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
