import React from 'react'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import api from '../../api/axiosConfig'
import { ReviewForm } from '../reviewForm/ReviewForm'

export const Reviews = ({getMovieData, movie, reviews, setReviews}) => {
  const reviewText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  useEffect(() => {
    getMovieData(movieId);
  }, [])

  const addReview = async (e) => {
    e.preventDefault();
    const review = reviewText.current;

    try {
        const response = await api.post("/api/v1/reviews", {reviewBody:review.value, imdbId:movieId});
        const updatedReviews = [...reviews, {body:review.value}];

        review.value = "";

        setReviews(updatedReviews);
    } catch(err) {
        console.error(err);
    }
  } 

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row>
            <Col>
                <img src={movie && movie.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} reviewText={reviewText} labelText="Write a review?" />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                }
                {
                    reviews && reviews.map((r) => {
                        return (
                            <>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                            </>
                        )
                    })
                }
            </Col>
        </Row>
        <Row>
            <Col>
                <hr />
            </Col>
        </Row>
    </Container>
  )
}
