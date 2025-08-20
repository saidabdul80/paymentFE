<template>
  <Special>
    <div class="tw-max-w-6xl tw-mx-auto tw-p-6">
      <!-- Header Section -->
      <div class="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6 tw-mb-6">
        <div class="tw-flex tw-justify-between tw-items-center tw-mb-4">
          <div>
            <h1 class="tw-text-3xl tw-font-bold tw-text-gray-800">
              Welcome to UGCC Dashboard
            </h1>
            <p class="tw-text-gray-600 tw-mt-2">
              Hello {{ user.first_name }}, welcome to the University of Guyana Computer Club portal
            </p>
          </div>
          <div class="tw-text-right">
            <v-btn @click="logout" variant="outlined" class="tw-mr-2">
              Logout
            </v-btn>
            <v-btn @click="editProfile" color="primary">
              Edit Profile
            </v-btn>
          </div>
        </div>
        
        <!-- Quick Stats -->
        <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-4 tw-mt-6">
          <div class="tw-bg-blue-50 tw-p-4 tw-rounded-lg tw-text-center">
            <div class="tw-text-2xl tw-font-bold tw-text-blue-600">{{ memberStats.totalMembers }}</div>
            <div class="tw-text-sm tw-text-gray-600">Total Members</div>
          </div>
          <div class="tw-bg-green-50 tw-p-4 tw-rounded-lg tw-text-center">
            <div class="tw-text-2xl tw-font-bold tw-text-green-600">{{ memberStats.upcomingEvents }}</div>
            <div class="tw-text-sm tw-text-gray-600">Upcoming Events</div>
          </div>
          <div class="tw-bg-purple-50 tw-p-4 tw-rounded-lg tw-text-center">
            <div class="tw-text-2xl tw-font-bold tw-text-purple-600">{{ memberStats.activeProjects }}</div>
            <div class="tw-text-sm tw-text-gray-600">Active Projects</div>
          </div>
          <div class="tw-bg-orange-50 tw-p-4 tw-rounded-lg tw-text-center">
            <div class="tw-text-2xl tw-font-bold tw-text-orange-600">{{ user.experience_level }}</div>
            <div class="tw-text-sm tw-text-gray-600">Your Level</div>
          </div>
        </div>
      </div>
      
      <!-- Main Content Grid -->
      <div class="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-6">
        <!-- Left Column -->
        <div class="lg:tw-col-span-2 tw-space-y-6">
          <!-- Recent Activities -->
          <div class="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6">
            <h2 class="tw-text-xl tw-font-semibold tw-mb-4">Recent Club Activities</h2>
            <div class="tw-space-y-4">
              <div v-for="activity in recentActivities" :key="activity.id" 
                   class="tw-border-l-4 tw-border-blue-500 tw-pl-4 tw-py-2">
                <div class="tw-font-medium">{{ activity.title }}</div>
                <div class="tw-text-sm tw-text-gray-600">{{ activity.description }}</div>
                <div class="tw-text-xs tw-text-gray-400 tw-mt-1">{{ activity.date }}</div>
              </div>
            </div>
          </div>
          
          <!-- Upcoming Events -->
          <div class="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6">
            <h2 class="tw-text-xl tw-font-semibold tw-mb-4">Upcoming Events</h2>
            <div class="tw-space-y-4">
              <div v-for="event in upcomingEvents" :key="event.id" 
                   class="tw-flex tw-justify-between tw-items-start tw-p-4 tw-border tw-rounded-lg">
                <div>
                  <div class="tw-font-medium">{{ event.title }}</div>
                  <div class="tw-text-sm tw-text-gray-600">{{ event.description }}</div>
                  <div class="tw-text-xs tw-text-gray-400 tw-mt-1">
                    📅 {{ event.date }} at {{ event.time }}
                  </div>
                  <div class="tw-text-xs tw-text-gray-400">
                    📍 {{ event.location }}
                  </div>
                </div>
                <v-btn size="small" color="primary" @click="registerForEvent(event.id)">
                  Register
                </v-btn>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right Column -->
        <div class="tw-space-y-6">
          <!-- Member Profile Card -->
          <div class="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6">
            <h2 class="tw-text-xl tw-font-semibold tw-mb-4">Your Profile</h2>
            <div class="tw-text-center tw-mb-4">
              <div class="tw-w-20 tw-h-20 tw-bg-gray-300 tw-rounded-full tw-mx-auto tw-mb-2 tw-flex tw-items-center tw-justify-center">
                <span class="tw-text-2xl tw-font-bold tw-text-gray-600">
                  {{ user.first_name.charAt(0) }}{{ user.last_name.charAt(0) }}
                </span>
              </div>
              <div class="tw-font-medium">{{ user.first_name }} {{ user.last_name }}</div>
              <div class="tw-text-sm tw-text-gray-600">{{ user.email }}</div>
            </div>
            
            <div class="tw-space-y-2 tw-text-sm">
              <div><strong>Username:</strong> {{ user.username }}</div>
              <div><strong>Academic Level:</strong> {{ user.academic_level }}</div>
              <div><strong>Field of Study:</strong> {{ user.field_of_study || 'Not specified' }}</div>
              <div><strong>Experience:</strong> {{ user.experience_level }}</div>
              <div><strong>Member Since:</strong> {{ formatDate(user.created_at) }}</div>
            </div>
            
            <div class="tw-mt-4" v-if="user.bio">
              <strong class="tw-text-sm">About:</strong>
              <p class="tw-text-sm tw-text-gray-600 tw-mt-1">{{ user.bio }}</p>
            </div>
          </div>
          
          <!-- Quick Actions -->
          <div class="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6">
            <h2 class="tw-text-xl tw-font-semibold tw-mb-4">Quick Actions</h2>
            <div class="tw-space-y-2">
              <v-btn @click="editProfile" variant="outlined" class="tw-w-full">
                Edit Profile
              </v-btn>
              <v-btn @click="viewMembers" variant="outlined" class="tw-w-full">
                View Members
              </v-btn>
              <v-btn @click="joinProject" variant="outlined" class="tw-w-full">
                Join a Project
              </v-btn>
              <v-btn @click="viewResources" variant="outlined" class="tw-w-full">
                Learning Resources
              </v-btn>
            </div>
          </div>
          
          <!-- Club News -->
          <div class="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6">
            <h2 class="tw-text-xl tw-font-semibold tw-mb-4">Club Announcements</h2>
            <div class="tw-space-y-3">
              <div v-for="news in clubNews" :key="news.id" 
                   class="tw-p-3 tw-bg-gray-50 tw-rounded">
                <div class="tw-font-medium tw-text-sm">{{ news.title }}</div>
                <div class="tw-text-xs tw-text-gray-600 tw-mt-1">{{ news.date }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Special>
</template>

<script>
import Special from '@/components/Special.vue';
import { useGlobalsStore } from '@/stores/globals';
import { useClient } from '@/stores/client';
import ls from '@/services/ls';

export default {
  components: {
    Special,
  },
  
  data() {
    return {
      global: useGlobalsStore(),
      user: {},
      memberStats: {
        totalMembers: 0,
        upcomingEvents: 0,
        activeProjects: 0
      },
      recentActivities: [],
      upcomingEvents: [],
      clubNews: [],
      loading: true
    };
  },
  
  async mounted() {
    await this.loadDashboardData();
  },
  
  methods: {
    async loadDashboardData() {
      try {
        // Load user data from localStorage or API
        const storedUser = ls.get('auth.ugcc_user');
        if (storedUser) {
          this.user = storedUser;
        }
        
        // Load dashboard stats
        await this.loadMemberStats();
        await this.loadRecentActivities();
        await this.loadUpcomingEvents();
        await this.loadClubNews();
        
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        this.loading = false;
      }
    },
    
    async loadMemberStats() {
      try {
        const response = await useClient().http({
          method: 'get',
          path: '/api/ugcc/dashboard/stats'
        });
        
        if (response) {
          this.memberStats = response;
        } else {
          // Fallback demo data
          this.memberStats = {
            totalMembers: 47,
            upcomingEvents: 3,
            activeProjects: 8
          };
        }
      } catch (error) {
        // Demo data fallback
        this.memberStats = {
          totalMembers: 47,
          upcomingEvents: 3,
          activeProjects: 8
        };
      }
    },
    
    async loadRecentActivities() {
      try {
        const response = await useClient().http({
          method: 'get',
          path: '/api/ugcc/activities/recent'
        });
        
        if (response) {
          this.recentActivities = response;
        } else {
          // Fallback demo data
          this.recentActivities = [
            {
              id: 1,
              title: "Python Workshop Completed",
              description: "Successfully completed beginner Python workshop with 20 participants",
              date: "2 days ago"
            },
            {
              id: 2,
              title: "New Project: University Portal",
              description: "Started development of new student portal using React and Node.js",
              date: "1 week ago"
            },
            {
              id: 3,
              title: "Hackathon Winners Announced",
              description: "Congratulations to Team CodeCrushers for winning our monthly hackathon",
              date: "2 weeks ago"
            }
          ];
        }
      } catch (error) {
        // Demo data fallback
        this.recentActivities = [
          {
            id: 1,
            title: "Python Workshop Completed",
            description: "Successfully completed beginner Python workshop with 20 participants",
            date: "2 days ago"
          },
          {
            id: 2,
            title: "New Project: University Portal",
            description: "Started development of new student portal using React and Node.js",
            date: "1 week ago"
          }
        ];
      }
    },
    
    async loadUpcomingEvents() {
      try {
        const response = await useClient().http({
          method: 'get',
          path: '/api/ugcc/events/upcoming'
        });
        
        if (response) {
          this.upcomingEvents = response;
        } else {
          // Fallback demo data
          this.upcomingEvents = [
            {
              id: 1,
              title: "JavaScript Fundamentals Workshop",
              description: "Learn the basics of JavaScript programming",
              date: "March 15, 2024",
              time: "2:00 PM",
              location: "Computer Lab A"
            },
            {
              id: 2,
              title: "Git & GitHub Tutorial",
              description: "Version control for beginners",
              date: "March 22, 2024",
              time: "4:00 PM",
              location: "Computer Lab B"
            },
            {
              id: 3,
              title: "Monthly Coding Challenge",
              description: "Solve algorithmic problems and win prizes",
              date: "March 30, 2024",
              time: "6:00 PM",
              location: "Main Auditorium"
            }
          ];
        }
      } catch (error) {
        // Demo data fallback
        this.upcomingEvents = [
          {
            id: 1,
            title: "JavaScript Fundamentals Workshop",
            description: "Learn the basics of JavaScript programming",
            date: "March 15, 2024",
            time: "2:00 PM",
            location: "Computer Lab A"
          }
        ];
      }
    },
    
    async loadClubNews() {
      try {
        const response = await useClient().http({
          method: 'get',
          path: '/api/ugcc/news/recent'
        });
        
        if (response) {
          this.clubNews = response;
        } else {
          // Fallback demo data
          this.clubNews = [
            {
              id: 1,
              title: "New Study Groups Starting",
              date: "March 10, 2024"
            },
            {
              id: 2,
              title: "Annual Tech Conference Registration Open",
              date: "March 8, 2024"
            },
            {
              id: 3,
              title: "Partnership with Local Tech Companies",
              date: "March 5, 2024"
            }
          ];
        }
      } catch (error) {
        // Demo data fallback
        this.clubNews = [
          {
            id: 1,
            title: "New Study Groups Starting",
            date: "March 10, 2024"
          },
          {
            id: 2,
            title: "Annual Tech Conference Registration Open",
            date: "March 8, 2024"
          }
        ];
      }
    },
    
    editProfile() {
      this.$router.push('/ugcc/profile/edit');
    },
    
    viewMembers() {
      this.$router.push('/ugcc/members');
    },
    
    joinProject() {
      this.$router.push('/ugcc/projects');
    },
    
    viewResources() {
      this.$router.push('/ugcc/resources');
    },
    
    async registerForEvent(eventId) {
      try {
        const response = await useClient().http({
          method: 'post',
          path: `/api/ugcc/events/${eventId}/register`
        });
        
        if (response) {
          this.global.palert({
            title: 'Registration Successful!',
            text: 'You have been registered for this event. Details will be sent to your email.',
            type: 'success'
          });
        }
      } catch (error) {
        this.global.palert({
          title: 'Registration Failed',
          text: 'Unable to register for event. Please try again.',
          type: 'error'
        });
      }
    },
    
    logout() {
      ls.remove('auth.ugcc_token');
      ls.remove('auth.ugcc_user');
      
      this.global.palert({
        title: 'Logged Out',
        text: 'You have been successfully logged out.',
        callback: () => {
          this.$router.push('/ugcc/login');
        },
      });
    },
    
    formatDate(dateString) {
      if (!dateString) return 'Unknown';
      return new Date(dateString).toLocaleDateString();
    }
  }
};
</script>

<style scoped>
/* Component-specific styles if needed */
</style>