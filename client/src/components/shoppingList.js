import React, {Component} from 'react';

import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import '../App.css';
import {connect} from 'react-redux'
import { getItems, deleteItem, } from '../actions/itemActions'
import propTypes from 'prop-types'
import UpdateModel from '../components/updateModel'

class shoppingList extends Component {
   
    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id)
    }
    onUpdateClick = () => {
       return <h1>my name</h1>
    }
    

  render() {

    
      const { items } = this.props.item;
    return (
      <div>
        <Container>
           
            <ListGroup>
                <TransitionGroup className="shopping-list">
                    {items.map(({ _id, name }) => (
                        <CSSTransition key={_id} timeout={500} classNames="fade">
                            <ListGroupItem >
                                <Button 
                                    className="remove-btn"
                                    color="danger"
                                    size="sm"
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                > &times;</Button>
                                {name}
        
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup>
        </Container>
      </div>
    )
  }
}

shoppingList.propTypes = {
    getItems: propTypes.func.isRequired,
    item: propTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    item: state.item
})

export default connect( mapStateToProps, { getItems, deleteItem, })(shoppingList);
