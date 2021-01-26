import React from 'react';

class Searchbar extends React.Component {
    handleChange = (event) => {
        this.setState({
            term: event.target.value
        });
    
    };
    handleSubmit = event => {
        event.preventDefault();
        this.props.handleFormSubmit(this.state.term);
    }

    render() {
        
        return (
            <>
            <div className='search-bar ui segment'>
                <form onSubmit={this.handleSubmit} className='ui form'>
                    <div className='field'>
                        <input className="input-an" onChange={this.handleChange} name='video-search' type="text" placeholder="Search.."/>
                        <input type='submit' className='bouton-an' value="Chercher"/>
                    </div>
                </form>
            </div>
            </>
        )
    }
}
export default Searchbar;