import React from "react";
import {Link} from "react-router-dom";

class Oferta_user extends React.Component{

    state = {
        divcontainer:false,
      }
      render()
      {
        var Handlechange = e =>
        {
            this.setState({divcontainer:!this.state.divcontainer})
        }
        const x=this.state.divcontainer;

    return(
        <div>        
            <button class="btn btn-lg mt-4" onClick={Handlechange}>{x?'Schowaj ofertę':'Pokaż ofertę'}</button>
            {   x&&(
                <div class="container text-center border radius mt-4" id="linia">
                <h1 class="font-weight-light">Z nami na pewno osiągniesz swój cel!</h1>
                <div class="row mt-4">
                  <div class="col-lg-8">
                    <img
                      class="img-fluid rounded mb-4 mb-lg-0"
                      src="https://www.r8elitefitness.com/wp-content/uploads/2020/08/pierwsze-spotkanie-z-trenerem-personalnym-1600x900.jpg"
                      alt=""
                    />
                  </div>
                  <div class="col-lg-4 font-weight-light">
                    <h4 class="font-weight-light">Czym zajmuje się nasz serwis?</h4>
                    <ul>
                      <li>
                        Zatrudniamy najlepszych trenerów z różnych dziedziń. Byś mógł dobrać sobie odpowiedniego trenera dla Ciebie.
                      </li>
                      <li>
                        Współpracujemy z dietetykami byś podczas treningu mógł dobrać sobie odpowiednią dietę.
                      </li>
                      <li>
                        Udostępniamy trenerom platformę na której mogą prowadzić treningi na żywo.
                      </li>
                    </ul>
                    <h4 class="font-weight-light">Jak możesz z niego korzystać?</h4>
                    <ul>
                      <li>
                        Możesz wykupywać tereningi, za <Link to="/cennik">Gymcnoiny</Link>. Wszystkie wykupione usługi zobaczysz w swoim dashboardzie.
                      </li>
                      <li>
                        Każdy planowany trening czy w grupach czy indywidualny zobaczysz w kalendarzyku.
                      </li>
                      <li>
                        Podczas treningu możesz włączyć kamerkę by trener mógł poprawiać sposób w jakim wykonujesz ćwiczenia.
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
export default Oferta_user;