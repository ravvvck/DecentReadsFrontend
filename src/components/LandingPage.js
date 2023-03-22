import React from 'react'
import Typography from '@mui/material/Typography';
import { Grid, Stack } from '@mui/material/';


export default function LandingPage() {
    return (
        <div className="landing-page">
        <div className="ladning-page-background">
          <span className="book-wise-your-ultima">
            BookWise: Your Ultimate Guide to Book Reviews and Recommendations
          </span>
          <span className="welcome-to-our-websi">
            Welcome to our website, your ultimate destination for personalized
            book recommendations based on your interests, favorite genres, and
            reading history. Discover your next favorite read and enrich your
            literary journey with our handpicked selection of books from various
            genres and authors.
          </span>
        </div>
        <span className="discover">Discover</span>
        <div className="flex-container">
          <button className="genre">
            <span >Biography</span>
          </button>
          <button className="genre">
            <span >Young Adult</span>
          </button>
          <button className="genre">
            <span >Romance</span>
          </button>
          <button className="genre">
            <span >Fantasy</span>
          </button>
        </div>
        <div className="flex-container-1">
          <button className="genre">
            <span >Thriller</span>
          </button>
          <button className="genre">
            <span >Science Fiction</span>
          </button>
          <button className="genre">
            <span >Horror</span>
          </button>
          <button className="genre">
            <span >Historical Fiction</span>
          </button>
        </div>
      </div>
    )
}