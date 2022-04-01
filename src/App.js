import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/fontawesome-free-brands'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      quotes: [], 
      index: 0
    }
  }

  componentDidMount() {
    fetch(API)
    .then(res => res.json())
    .then(res => {
      this.setState({
        quotes: res.quotes
      });
    });
  }

  getRandomIndex = () => { 
    const quotes = this.state.quotes;
    const index = this.state.index;
    const quote = quotes[index];

    //if quotes is longer than 0, find random index and set state
    if(quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length)
      this.setState({
        index: index
      })
    }
  }

  render() {
    const quotes = this.state.quotes;
    const index = this.state.index;
    const quote = quotes[index];
    const quoteText = quote && quote.quote;
    const quoteAuthor = quote && quote.author;
    const copyQuote =  '"' + quoteText + '"' + ' - ' + quoteAuthor;
    
    return(
      <div className="wrapper d-flex align-items-center justify-content-center">
          <div className="col-7 box">
            <div id="quote-box">
            <div className="text-center" id="text">
              <p>{quoteText}</p>
            </div>  
            <div className="d-flex justify-content-end" id="author">
              <p>- {quoteAuthor}</p>
            </div>
            <div className="row d-flex justify-content-between align-items-center flex-wrap-reverse">
              <div className="col d-flex flex-row justify-content-center" id="share-btns">
                <a id="tweet-quote" href={`https://twitter.com/intent/tweet?hashtags=quotes&text=${quoteText} - ${quoteAuthor}`} target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
                <div id="copy-quote">
                  <CopyToClipboard text={copyQuote}>
                    <a href="/" id="copy-quote-btn"><FontAwesomeIcon icon={faCopy} /></a>
                  </CopyToClipboard>
                </div>
              </div>
              <div className="col d-flex justify-content-center">
                <button className="btn btn-primary" id="new-quote" onClick={this.getRandomIndex}>New quote</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
