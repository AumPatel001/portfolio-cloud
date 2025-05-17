import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertPageVisitSchema, insertProjectInquirySchema } from "@shared/schema";
import path from "path";

// Track unique page views
const trackPageVisit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Only track actual page views, not API calls or asset requests
    if (!req.path.startsWith('/api/') && !req.path.includes('.')) {
      const visit = {
        page: req.path || '/',
        visitorIp: req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown',
        referer: req.headers.referer || '',
      };
      
      await storage.recordPageVisit(visit);
    }
  } catch (error) {
    console.error('Error tracking page visit:', error);
    // Don't block the request if tracking fails
  }
  
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Add page visit tracking middleware
  app.use(trackPageVisit);
  
  // API route for sending contact form data (now with database storage)
  app.post('/api/contact', async (req, res) => {
    try {
      const result = insertContactSubmissionSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid form data', 
          errors: result.error.format() 
        });
      }
      
      // Store in the database
      const submission = await storage.createContactSubmission(result.data);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Message sent successfully',
        id: submission.id
      });
    } catch (error) {
      console.error('Error in contact form submission:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Server error, please try again later' 
      });
    }
  });
  
  // API route for project inquiries
  app.post('/api/inquiries', async (req, res) => {
    try {
      const result = insertProjectInquirySchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid inquiry data', 
          errors: result.error.format() 
        });
      }
      
      // Store in the database
      const inquiry = await storage.createProjectInquiry(result.data);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Project inquiry submitted successfully',
        id: inquiry.id
      });
    } catch (error) {
      console.error('Error in project inquiry submission:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Server error, please try again later' 
      });
    }
  });
  
  // API route to get analytics data (protected in a real app)
  app.get('/api/analytics', async (req, res) => {
    try {
      const pageVisits = await storage.getPageVisits();
      
      // Calculate some basic statistics
      const pageViews = pageVisits.length;
      const uniqueVisitors = new Set(pageVisits.map(visit => visit.visitorIp)).size;
      const pageViewsByPath = pageVisits.reduce((acc, visit) => {
        acc[visit.page] = (acc[visit.page] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      return res.status(200).json({
        pageViews,
        uniqueVisitors,
        pageViewsByPath
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Server error, please try again later' 
      });
    }
  });
  
  // API route to get contact submissions (protected in a real app)
  app.get('/api/contact', async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      return res.status(200).json({ submissions });
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Server error, please try again later' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
