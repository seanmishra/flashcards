import React from 'react';
import Card from '../components/newcard.jsx';

export default class CreatePage extends React.Component {
    constructor(){
        super();

        this.state = {
            'dupDeck': false,
            'cards': [{}]
        };

        this._addCard = this._addCard.bind(this);
        this._handleValue = this._handleValue.bind(this);
        this._saveDeck = this._saveDeck.bind(this);
        this._chkDeckName = this._chkDeckName.bind(this);
    }
    render(){
        return (
            <main className="createDeck">
                <div className='row'>
                    <div className="col-md-10 col-md-offset-1">
                        <form onSubmit={this._saveDeck}>
                            <label>Deck Name</label>
                            <input type="text" className="form-control input-lg" placeholder="English Vocab Deck 20" required
                            ref={(deckName) => this.deckName = deckName} onChange={this._chkDeckName} />
                            {
                                this.state.dupDeck &&
                                <div className="alert alert-danger dupDeckAlert">Deck with this name already exists!</div>
                            }
                            {this.state.cards.map((card,cardNo) => <Card cardNo={cardNo + 1} key={cardNo} handleValue={this._handleValue}/>)}
                            <hr />
                            <button type="button" className="btn btn-success" onClick={this._addCard}>
                                <i className="glyphicon glyphicon-plus"></i> New card
                            </button>
                            <button type="submit" className="btn btn-primary pull-right">
                                <i className="glyphicon glyphicon-hdd"></i> Save Deck
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        );
    }

    _addCard(){
        let cards = this.state.cards.concat({});
        this.setState({cards: cards});
    }
    
    _chkDeckName(){
        if(localStorage.hasOwnProperty(this.deckName.value)) {
            this.setState({dupDeck: true});
        } else {
            this.setState({dupDeck: false});
        }
    }

    _saveDeck(e){
        e.preventDefault();
        let cards = this.state.cards.filter(e => e.question);
        localStorage[this.deckName.value] = cards;
        alert("Deck Saved!");
        this.props.router.push('/');
    }
    
    _handleValue(cardNo, valType, val){
        let cards = this.state.cards.slice();
        cards[cardNo-1][valType] = val;
        this.setState({cards: cards});
    }

}