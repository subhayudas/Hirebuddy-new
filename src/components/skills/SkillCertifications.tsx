
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, ExternalLink, Calendar, Download, Star } from "lucide-react";

export const SkillCertifications = () => {
  const earnedCertifications = [
    {
      title: "React Developer Certification",
      issuer: "Meta",
      dateEarned: "2024-01-15",
      expiryDate: "2026-01-15",
      credentialId: "META-RDC-2024-8392",
      verificationUrl: "https://verify.meta.com/cert/8392",
      skills: ["React", "JSX", "Hooks", "Context API"]
    },
    {
      title: "JavaScript Professional Certificate",
      issuer: "Google",
      dateEarned: "2023-11-20",
      expiryDate: "2025-11-20",
      credentialId: "GOOGLE-JSP-2023-7641",
      verificationUrl: "https://verify.google.com/cert/7641",
      skills: ["JavaScript", "ES6+", "Async Programming", "DOM"]
    },
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      dateEarned: "2023-09-10",
      expiryDate: "2026-09-10",
      credentialId: "AWS-CP-2023-5829",
      verificationUrl: "https://verify.aws.com/cert/5829",
      skills: ["AWS", "Cloud Computing", "S3", "EC2"]
    }
  ];

  const availableCertifications = [
    {
      title: "TypeScript Advanced Certification",
      issuer: "Microsoft",
      duration: "3 hours",
      price: "$149",
      difficulty: "Advanced",
      rating: 4.8,
      description: "Master advanced TypeScript concepts and patterns",
      skills: ["TypeScript", "Generics", "Decorators", "Advanced Types"]
    },
    {
      title: "Node.js Professional Certificate",
      issuer: "IBM",
      duration: "4 hours",
      price: "$199",
      difficulty: "Intermediate",
      rating: 4.7,
      description: "Build scalable backend applications with Node.js",
      skills: ["Node.js", "Express", "NPM", "Server Architecture"]
    },
    {
      title: "System Design Expert Certification",
      issuer: "TechEducation",
      duration: "5 hours",
      price: "$299",
      difficulty: "Expert",
      rating: 4.9,
      description: "Design large-scale distributed systems",
      skills: ["System Design", "Scalability", "Microservices", "Load Balancing"]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-orange-100 text-orange-800";
      case "Expert": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const sixMonthsFromNow = new Date(now.getTime() + (6 * 30 * 24 * 60 * 60 * 1000));
    return expiry < sixMonthsFromNow;
  };

  return (
    <div className="space-y-6">
      {/* Earned Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-600" />
            Your Certifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {earnedCertifications.map((cert, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{cert.title}</h3>
                      <p className="text-gray-600 mb-2">Issued by {cert.issuer}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Earned: {new Date(cert.dateEarned).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Expires: {new Date(cert.expiryDate).toLocaleDateString()}
                        </div>
                      </div>
                      {isExpiringSoon(cert.expiryDate) && (
                        <Badge className="bg-orange-100 text-orange-800 mt-2">
                          Expires Soon
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Verify
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Credential ID</h4>
                      <p className="text-sm text-gray-600 font-mono">{cert.credentialId}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Skills Validated</h4>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Certifications */}
      <Card>
        <CardHeader>
          <CardTitle>Available Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCertifications.map((cert, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-1">{cert.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">by {cert.issuer}</p>
                      <p className="text-sm text-gray-700">{cert.description}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Duration: {cert.duration}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          {cert.rating}
                        </div>
                      </div>
                      <Badge className={getDifficultyColor(cert.difficulty)}>
                        {cert.difficulty}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Skills Covered</h4>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-lg font-bold text-green-600">{cert.price}</span>
                      <Button>
                        Take Exam
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Award className="h-12 w-12 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-gray-600">Certifications Earned</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-gray-600">Skills Validated</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="h-12 w-12 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">4.8</div>
            <div className="text-sm text-gray-600">Average Score</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
