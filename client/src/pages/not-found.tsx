import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="border-2">
          <CardContent className="pt-12 pb-12 px-6 md:px-12 text-center">
            {/* 404 Number */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <h1 className="text-8xl md:text-9xl font-bold text-primary/20 select-none">
                404
              </h1>
            </motion.div>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex justify-center mb-6"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="h-10 w-10 text-primary" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Page Not Found
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-muted-foreground text-lg mb-8 max-w-md mx-auto"
            >
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto"
                data-testid="button-go-home"
              >
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Home
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                data-testid="button-go-back"
                onClick={() => window.history.back()}
              >
                <a>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </a>
              </Button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-12 pt-8 border-t border-border"
            >
              <p className="text-sm text-muted-foreground mb-4">Quick Links</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/projects">
                  <Button variant="ghost" size="sm" data-testid="link-projects">
                    Projects
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="ghost" size="sm" data-testid="link-about">
                    About
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="ghost" size="sm" data-testid="link-contact">
                    Contact
                  </Button>
                </Link>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
