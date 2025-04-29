import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import FlagIcon from '@mui/icons-material/Flag';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PersonIcon from '@mui/icons-material/Person';
import teamImage from '/images/Kitchen.jpg';
import Footer from '../components/footer/Footer';

const AboutUs = () => {
  return (
    <Box sx={{backgroundImage: 'url("/images/bg.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'}}>
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">

        {/* Top: Image left, text right */}
        <Grid container spacing={4} alignItems="center" sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={teamImage}
              alt="AutoChef"
              sx={{ width: '100%', borderRadius: 3, boxShadow: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
          <Card sx={{ justifyItems:'center', textAlign: 'center', p: 3, bgcolor:'rgba(255, 255, 255, 0.50)', borderRadius:'8px'}}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              About AutoChef
            </Typography>
            <Typography variant="body1" color="text.secondary">
              AutoChef is your ultimate smart kitchen assistant. Our platform empowers home cooks to plan, prepare, and
              enjoy meals through smart recipes, integrated kitchen tools, and seamless grocery experiences. Whether
              you're a beginner or a pro, AutoChef is here to make your cooking journey delightful.
            </Typography>
          </Card>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 6 }} />

        {/* Our Values Section */}
        <Typography sx={{ pb:5 }} variant="h4" align="center" gutterBottom fontWeight="bold">
          Our Values
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ justifyItems:'center', textAlign: 'center', p: 3, maxWidth:500, bgcolor:'rgba(255, 255, 255, 0.50)', borderRadius:'8px',
              transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' }
              
             }}>
              <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
                <RocketLaunchIcon />
              </Avatar>
              <Typography variant="h6">Speed is our advantage</Typography>
              <Typography variant="body2" color="text.secondary">
                We prioritize rapid innovation to bring the latest culinary technologies to our users.
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ justifyItems:'center', textAlign: 'center', p: 3, maxWidth:500, bgcolor:'rgba(255, 255, 255, 0.50)', borderRadius:'8px',
              transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' }
              
             }}>
              <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
                <PersonIcon />
              </Avatar>
              <Typography variant="h6">Own it</Typography>
              <Typography variant="body2" color="text.secondary">
                We take responsibility for our work, delivering quality and reliability in every feature.
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ justifyItems:'center', textAlign: 'center', p: 3, maxWidth:500, bgcolor:'rgba(255, 255, 255, 0.50)', borderRadius:'8px',
              transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' }
              
             }}>
              <Avatar sx={{ bgcolor: 'error.main', mb: 2 }}>
                <FlagIcon />
              </Avatar>
              <Typography variant="h6">We get through it</Typography>
              <Typography variant="body2" color="text.secondary">
                We tackle challenges head-on, ensuring we overcome obstacles to achieve our goals.
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ justifyItems:'center', textAlign: 'center', p: 3, maxWidth:500, bgcolor:'rgba(255, 255, 255, 0.50)', borderRadius:'8px',
              transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' }
              
             }}>
              <Avatar sx={{ bgcolor: 'info.main', mb: 2 }}>
                <HandshakeIcon />
              </Avatar>
              <Typography variant="h6">Side by side</Typography>
              <Typography variant="body2" color="text.secondary">
                We work together, valuing each team member’s contribution to our success.
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ justifyItems:'center', textAlign: 'center', p: 3, maxWidth:500, bgcolor:'rgba(255, 255, 255, 0.50)', borderRadius:'8px',
              transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' }
              
             }}>
              <Avatar sx={{ bgcolor: 'secondary.main', mb: 2}}>
                <EmojiObjectsIcon />
              </Avatar>
              <Typography variant="h6">Believe big</Typography>
              <Typography variant="body2" color="text.secondary">
                We aim high, constantly seeking to expand our horizons and impact in the culinary world.
              </Typography>
            </Card>
          </Grid>

          
        </Grid>

      </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default AboutUs;
