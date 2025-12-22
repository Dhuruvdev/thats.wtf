import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function Privacy() {
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
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-12">
              Last updated: December 21, 2025
            </p>

            <div className="space-y-8 prose prose-invert max-w-none">
              <section>
                <h2 className="text-2xl font-display font-black text-white mb-4">Introduction</h2>
                <p className="text-muted-foreground">
                  <span className="brand-text"><span className="brand-text-thats">thats</span><span className="brand-text-dot">.</span><span className="brand-text-wtf">wtf</span></span> ("we" or "us" or "our") operates the https://thats.wtf website (the "Service").
                </p>
                <p className="text-muted-foreground">
                  This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-black text-white mb-4">Information Collection and Use</h2>
                <p className="text-muted-foreground mb-2">
                  We collect several different types of information for various purposes to provide and improve our Service to you.
                </p>
                <h3 className="text-lg font-bold text-white mt-4 mb-2">Types of Data Collected:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you</li>
                  <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data")</li>
                  <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our Service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-black text-white mb-4">Use of Data</h2>
                <p className="text-muted-foreground">
                  <span className="brand-text"><span className="brand-text-thats">thats</span><span className="brand-text-dot">.</span><span className="brand-text-wtf">wtf</span></span> uses the collected data for various purposes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
                  <li>To provide and maintain our Service</li>
                  <li>To notify you about changes to our Service</li>
                  <li>To allow you to participate in interactive features of our Service</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information so that we can improve our Service</li>
                  <li>To monitor the usage of our Service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-display font-black text-white mb-4">Security of Data</h2>
                <p className="text-muted-foreground">
                  The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-black text-white mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us at privacy@thats.wtf
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
