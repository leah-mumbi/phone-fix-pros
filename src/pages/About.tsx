import Navigation from "@/components/Navigation";
import WhatsAppFloating from "@/components/WhatsAppFloating";
import { Users, Award, Clock, Wrench } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, label: "Happy Customers", value: "10,000+" },
    { icon: Award, label: "Years Experience", value: "15+" },
    { icon: Clock, label: "Average Repair Time", value: "24hrs" },
    { icon: Wrench, label: "Repairs Completed", value: "50,000+" },
  ];

  const team = [
    {
      name: "John Kamau",
      role: "Founder & Lead Technician",
      image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Mary Wanjiku",
      role: "Customer Relations Manager",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=300&fit=crop&crop=face",
    },
    {
      name: "Peter Ochieng",
      role: "Senior Electronics Technician",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 pb-16 pt-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl">
              About <span className="text-primary">Nzuri Mobiles</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We're Kenya's leading electronics repair service, dedicated to bringing your devices back to life with expert care and genuine parts.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-foreground">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2009, Nzuri Mobiles started as a small repair shop in Nairobi with a simple mission: to provide honest, reliable, and affordable mobile device repair services to our community.
                </p>
                <p>
                  Over the years, we've grown into one of Kenya's most trusted repair centers, serving thousands of customers across the country. Our commitment to quality and customer satisfaction has remained unchanged.
                </p>
                <p>
                  Today, we operate multiple service centers across Kenya, equipped with state-of-the-art diagnostic tools and staffed by certified technicians who undergo continuous training to stay ahead of the latest technology trends.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=400&fit=crop"
                alt="Nzuri Mobiles workshop"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 rounded-xl bg-primary p-6 text-primary-foreground shadow-lg">
                <p className="text-3xl font-bold">15+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-2xl bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Our Values</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">Quality First</h3>
              <p className="text-muted-foreground">
                We use only genuine parts and follow manufacturer guidelines to ensure every repair meets the highest standards.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">Customer Focus</h3>
              <p className="text-muted-foreground">
                Your satisfaction is our priority. We keep you informed throughout the repair process and stand behind our work.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                <Clock className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">Fast Turnaround</h3>
              <p className="text-muted-foreground">
                We understand you need your devices. Most repairs are completed within 24-48 hours without compromising quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Meet Our Team</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhatsAppFloating phoneNumber="+254707907223" businessName="Nzuri Mobiles" />
    </div>
  );
};

export default About;
