"use client"
import { Elements, useElements, useStripe, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { MdVerifiedUser } from "react-icons/md";
import { TbCalendarTime } from "react-icons/tb";
import { LuShoppingBasket } from "react-icons/lu";
import { AiFillCreditCard } from "react-icons/ai";
import { FaTruck } from "react-icons/fa";
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Image from "next/image";

export default function Checkout() {
  const [display, setDisplay] = useState(false);

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  const options = {
    appearance: {
        rules: {
            '.Input': {
                border: '1px solid grey'
            }
        },
    },
  };


  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!stripe || !elements) {
          setError("Stripe n'est pas encore chargé.");
          return;
        }
    
        const cardElement = elements.getElement(CardNumberElement);
        
        if (!cardElement) {
          setError("Élément carte introuvable.");
          return;
        }
    
        setTimeout(async () => {
            const { paymentMethod, error } = await stripe.createPaymentMethod({
              type: "card",
              card: cardElement,
            });

            if (error) {
              setError(error.message || "Une erreur est survenue.");
              return;
            }

            setDisplay(true);
            setTimeout(() => {
                setDisplay(false);
            }, 4000);
        }, 100);
      };
      
    return (
        <form>
            <div>
                <div className="form-check d-flex justify-content-between card-selected-div">
                    <label className="form-check-label d-flex align-items-center" htmlFor="creditCard" style={{ 'padding': '0', 'fontWeight': 'bold' }}>
                        <Image
                            className=' me-3'
                            src="/images/card.png"
                            alt="logo"
                            width={40}
                            height={40}
                            priority
                        />
                        Carte de crédit
                    </label>
                    <input className="form-check-input" type="radio" id="creditCard" value="" defaultChecked={true} />
                </div>

                <div className='card-div'>

                    <div className='mb-3'>
                        <label className='fw-bold'>Numéro de carte</label>
                        <div className='d-flex align-items-center'>
                            <div className='d-flex' style={{ 'fontSize': '30px', 'color': '#181288' }}>
                                <AiFillCreditCard />
                            </div>
                            <div className='form-control ms-2'>
                                <CardNumberElement/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label className='fw-bold'>Date d&apos;exp.</label>
                            <div className='form-control'>
                                <CardExpiryElement/>
                            </div>
                        </div>
                        <div className="col">
                            <label className='fw-bold'>CVC/CVV</label>
                            <div className='form-control'>
                                <CardCvcElement/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="alert alert-success mt-5" style={{ 'display': display ? 'block' : 'none' }}>
                Le paiement a été effectué avec succès
            </div>
            
            <button className='btn submit-button mt-5' type="button" onClick={handleSubmit} disabled={!stripe}>
                <span>
                    <FontAwesomeIcon icon={faLock} className="text-gray-600 text-xl" />
                </span>
                <span className='ms-2'>
                    Payer
                </span>
            </button>

            <div className='mt-3 text-center'>
                <span className='me-2' style={{ 'color': 'grey' }}>
                    <FontAwesomeIcon icon={faLock} className="text-gray-600 text-xl" />
                </span>
                Toutes les transactions sont sécurisées et cryptées
            </div>

            <div className='text-center mt-3'>
                <Image
                    className='me-2'
                    src="/images/visa.png"
                    alt="logo"
                    width={70}
                    height={60}
                    priority
                />
                <Image
                    className='ms-2'
                    src="/images/mastercard.jpeg"
                    alt="logo"
                    width={50}
                    height={40}
                    priority
                />
            </div>

            <style jsx>{`
                .card-div {
                    border: 1px solid lightgrey;
                    border-bottom-right-radius: 10px;
                    border-bottom-left-radius: 10px;
                    padding: 15px;
                }

                .card-selected-div {
                    padding: 0;
                    background-color: #f0f8ff;
                    border: 2px solid #b5791c;
                    border-top-right-radius: 10px;
                    border-top-left-radius: 10px;
                    margin: 0;
                    padding: 15px;
                }

                .submit-button {
                    background-color: #b5791c;
                    color: white;
                    width: 100%;
                    padding-top: 15px;
                    padding-bottom: 15px;
                }
            `}</style>
        </form>
    );
  };

  return (
    <>
        <div className="container mb-5">

            <div className="hr-border-top">
                <hr />
            </div>

            <div className="d-flex justify-content-between" style={{ 'paddingTop': '7px', 'paddingBottom': '7px' }}>
                <div>
                    <Image
                        src="/images/logo.webp"
                        alt="logo"
                        width={60}
                        height={40}
                        priority
                    />
                </div>
                <div className="d-flex align-items-center" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    <span className="me-3">Panier</span>
                    <LuShoppingBasket />
                </div>
            </div>

            <div className="hr-border">
                <hr />
            </div>

            {/* Formulaire */}
            <div className="row justify-content-between">
                <div className="col section-div-1">
                    <div>

                        <div className="title">
                            <h3>Contact</h3>
                            <span>Entrez vos informations de contact</span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Indiquez votre email" />
                        </div>
                        <div className="form-group mb-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="emailMarket" defaultChecked={true} />
                                <label className="form-check-label" htmlFor="emailMarket">
                                    J&apos;accepte de recevoir des emails marketing
                                </label>
                            </div>
                        </div>

                        <div className="title">
                            <h3>Adresse de livraison</h3>
                            <span>Entrez votre adresse de livraison</span>
                        </div>

                        <div className="row">
                            <div className="form-group col-md-6">
                                <label htmlFor="firstName">Prénom</label>
                                <input type="text" className="form-control" id="firstName" placeholder="Indiquez votre prénom" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="lastName">Nom</label>
                                <input type="text" className="form-control" id="lastName" placeholder="Indiquez votre nom" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Adresse</label>
                            <input type="text" className="form-control" id="address" placeholder="123 rue principale, Ville, Pays" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="additionalAddress">Adresse complémentaire (optionnel)</label>
                            <input type="text" className="form-control" id="additionalAddress" placeholder="Adresse complémentaire" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country">Pays</label>
                            <select id="country" className="form-select">
                                <option value="">Selectionnez un pays</option>
                                <option value="tunisia">Tunisie</option>
                                <option value="france">France</option>
                            </select>
                        </div>

                        <div className="row">
                            <div className="form-group col-md-4">
                                <label htmlFor="city">Ville</label>
                                <input type="text" className="form-control" id="city" placeholder="Indiquez votre ville" />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="state">État</label>
                                <input type="text" className="form-control" id="state" placeholder="Indiquez votre état" />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="zip">Code postal</label>
                                <input type="text" className="form-control" id="zip" placeholder="Indiquez votre code postal" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Téléphone</label>
                            <input type="text" className="form-control" id="phone" placeholder="Indiquez votre numéro de téléphone" />
                        </div>

                        <div className="form-group mb-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="differentAddress" />
                                <label className="form-check-label" htmlFor="differentAddress">
                                    L&apos;adresse de facturation est différente de l&apos;adresse de livraison
                                </label>
                            </div>
                        </div>

                        <div className="title">
                            <h3>Méthode de livraison</h3>
                            <span>Sélectionnez votre méthode de livraison ci-dessous</span>
                        </div>

                        <div className="alert alert-primary alert-select-country mb-5" role="alert">
                            Information<br/>Sélectionnez un pays pour voir les méthodes d&apos;expedion disponibles
                        </div>

                        <div className="title">
                            <h3>Paiement</h3>
                            <span>Sélectionnez votre méthode de paiement ci-dessous. Toutes les transactions sont sécurisées et cryptées.</span>
                        </div>

                        <Elements stripe={stripePromise} options={options}>
                            <CheckoutForm />
                        </Elements>

                    </div>
                </div>

                <div className="col-1" style={{
                    'borderRight': '1px solid lightgrey',
                    'width': 'auto',
                    'padding': '0'
                }}></div>

                {/* Recap Commande */}
                <div className="col section-div-2">
                    <h3>Votre commande</h3>

                    <div className="d-flex justify-content-between mt-4 mb-4">
                        <div className="d-flex">
                            <div className="article-img">
                                <Image
                                    src="/images/montessori.webp"
                                    alt="montessori"
                                    width={60}
                                    height={60}
                                    priority
                                />
                                <span className="article-badge">1</span>
                            </div>
                            <div className="ms-3">
                                <div className="title-command-detail">Montessori Multi-Usage Observation Tower</div>
                                <div className="value-command-detail">Default Title</div>
                            </div>
                        </div>

                        <div style={{ fontWeight: 'bold' }}>€39.90</div>

                    </div>

                    <div className="d-flex">
                        <input type="text" className="form-control flex-grow-1" placeholder="Code de réduction" />
                        <button className="btn btn-outline-primary ms-2">Appliquer</button>
                    </div>

                    <div className='mt-4'>
                        <div className="d-flex justify-content-between mb-3 items">
                            <span>Sous-total 1 items</span>
                            <span>€39.90</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3 items">
                            <span>Livraison</span>
                            <span>-</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3 items">
                            <span>Taxes estimées</span>
                            <span>€0.00</span>
                        </div>

                        <hr />

                        <div className="d-flex justify-content-between" style={{ "fontSize": '27px', 'fontWeight': 'bold', }}>
                            <span>Total</span>
                            <span>€39.90</span>
                        </div>

                        <div className="mt-3">
                            <div className="d-flex align-items-baseline mb-3">
                                <div className="icon-command">
                                    <MdVerifiedUser />
                                </div>
                                <div className="ms-3">
                                    <div className="title-command-detail">
                                        Service client
                                    </div>
                                    <div className="value-command-detail">
                                        Nous répondons à vos questions du lundi au vendredi de 9h à 20h.
                                    </div>

                                </div>
                            </div>

                            <div className="d-flex align-items-baseline mb-3">
                                <div className="icon-command">
                                    <TbCalendarTime />
                                </div>
                                <div className="ms-3">
                                    <div className="title-command-detail">
                                        Satisafait ou remboursé 30 jours
                                    </div>
                                    <div className="value-command-detail">
                                        Insatisafait ? Remboursement facile et sans conditions. Votre satisfaction est notre priorité.
                                    </div>

                                </div>
                            </div>

                            <div className="d-flex align-items-baseline mb-3">
                                <div className="icon-command">
                                    <FaTruck />
                                </div>
                                <div className="ms-3">
                                    <div className="title-command-detail">
                                        Expédition en 48h
                                    </div>
                                    <div className="value-command-detail">
                                        Bénéficiez d&apos;une expedition ultra-rapide avec suivi en seulement 48 heures.
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <style jsx>{`
            .container {
                padding: 10px;
            }

            .form-group {
                margin-bottom: 15px;
            }

            .form-group label {
                font-weight: 700;
            }

            .title {
                margin-bottom: 30px;
            }

            h3 {
                font-weight: bold;
            }

            .icon-command {
                color: #63b773;
                font-size: 22px;
            }

            .title-command-detail {
                font-weight: bold;
            }

            .value-command-detail {
                font-weight: bold;
                color: grey;
                font-size: 13px;
            }

            .items {
                font-weight: 500;
            }

            .article-img {
                position: relative;
                width: fit-content;
            }

            .article-badge {
                position: absolute;
                top: 0;
                right: 0;
                transform: translate(50%, -50%);
                background-color: grey;
                color: white;
                font-size: 12px;
                font-weight: bold;
                width: 21px;
                height: 21px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            }

            .alert-select-country {
                background-color: aliceblue;
                border-color: aliceblue;
                color: black;
                font-weight: bold;
            }

            .hr-border, .hr-border-top {
                align-items: center;
                display: flex;
                flex-direction: column-reverse;
            }

            .hr-border hr {
                width: 120%;
                margin: 0;
            }

            .hr-border-top hr {
                width: 120%;
                margin: 0;
                box-shadow: 0 -5px 10px #ffd500, 0 5px 10px #ffd500;
                border: none;
                height: 3px;
                color: #caa800;
                background-color: #caa800;
            }

            .section-div-1 {
                padding-top: 30px;
                padding-right: 30px;
                padding-bottom: 30px;
            }

            .section-div-2 {
                padding-top: 30px;
                padding-left: 30px;
            }
        `}</style>
    </>
  );
}
