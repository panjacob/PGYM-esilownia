import React from "react";
import {Link} from "react-router-dom";

class Home_offer_user extends React.Component {

    state = {
        divcontainer: false,
    }

    render() {
        var Handlechange = e => {
            this.setState({divcontainer: !this.state.divcontainer})
        }
        const x = this.state.divcontainer;

        return (
            <div className="home_offer_user">

                <button className="btn btn-lg mt-4"
                        onClick={Handlechange}>{x ? 'Schowaj ofertę' : 'Pokaż ofertę'}
                </button>

                {x && (
                    <div className="container text-center border radius mt-4" id="linia">

                        <h1 className="font-weight-light">Z nami na pewno osiągniesz swój cel!</h1>

                        <div className="row mt-4">

                            <div className="col-lg-8">
                                <img
                                    className="img-fluid rounded mb-4 mb-lg-0"
                                    src="https://www.r8elitefitness.com/wp-content/uploads/2020/08/pierwsze-spotkanie-z-trenerem-personalnym-1600x900.jpg"
                                    alt=""
                                />
                            </div>

                            <div className="col-lg-4 font-weight-light">

                                <h4 className="font-weight-light">Czym zajmuje się nasz serwis?</h4>
                                <ul>
                                    <li>
                                        Zatrudniamy najlepszych trenerów z różnych dziedziń. Byś mógł dobrać sobie
                                        odpowiedniego trenera dla Ciebie.
                                    </li>
                                    <li>
                                        Współpracujemy z dietetykami byś podczas treningu mógł dobrać sobie odpowiednią
                                        dietę.
                                    </li>
                                    <li>
                                        Udostępniamy trenerom platformę na której mogą prowadzić treningi na żywo.
                                    </li>
                                </ul>

                                <h4 className="font-weight-light">Jak możesz z niego korzystać?</h4>
                                <ul>
                                    <li>
                                        Możesz wykupywać tereningi, za <Link to="/cennik">Gymcnoiny</Link>. Wszystkie
                                        wykupione usługi zobaczysz w swoim dashboardzie.
                                    </li>
                                    <li>
                                        Każdy planowany trening czy w grupach czy indywidualny zobaczysz w kalendarzyku.
                                    </li>
                                    <li>
                                        Podczas treningu możesz włączyć kamerkę by trener mógł poprawiać sposób w jakim
                                        wykonujesz ćwiczenia.
                                    </li>
                                </ul>

                            </div>

                        </div>

                    </div>
                )
                }

            </div>
        );
    }
}

export default Home_offer_user;