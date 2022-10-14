import React, { memo, useEffect, useState, useCallback } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from 'react-google-maps';
import Geocode from 'react-geocode';
import { GOOGLE_MAP_API } from '../../config';
import { useDispatch } from 'react-redux';
import * as action from '../../redux/auth/actions';
import toastr from 'toastr';
import AddressForm from './addressForm';
import { getArea, getCity, getNumber, getPostalCode, getState, getStreet } from './utils';
import * as actionsProduct from '../../redux/product/actions';
Geocode.setApiKey(GOOGLE_MAP_API);
Geocode.enableDebug();

function Map(props: any): JSX.Element {
  const dispatch = useDispatch();
  const [isUpdate, setUpdate] = useState<boolean>(false);
  const [state, setState] = useState<any>({
    address: '',
    area: '',
    building_or_block: '',
    additional_info: '',
    state: '',
    street: '',
    number: '',
    city: '',
    street2: '',
    postal_code: '',
    mapPosition: {
      lat: 23.7919546,
      lng: 90.4079771,
    },
    markerPosition: {
      lat: 23.7919546,
      lng: 90.4079771,
    },
  });
  const [showFormAddress, setShowFormAddress] = useState<boolean>(false);

  useEffect(() => {
    Geocode.fromLatLng(state.mapPosition.lat, state.mapPosition.lng).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = getCity(addressArray),
          area = getArea(addressArray),
          state = getState(addressArray),
          street = getStreet(addressArray),
          number = getNumber(addressArray),
          postal_code = getPostalCode(addressArray);
        setState((prevState: any) => ({
          ...prevState,
          address: address ? address : '',
          area: area ? area : '',
          city: city ? city : '',
          state: state ? state : '',
          street: street ? street : '',
          number: number ? number : '',
          postal_code: postal_code ? postal_code : '',
          markerPosition: {
            lat: lat,
            lng: lng,
          },
          mapPosition: {
            lat: lat,
            lng: lng,
          },
        }));
      },
      (error) => {
        console.error(error);
      },
    );
  }, []);

  const setMarkerPosition = (event: any) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = getCity(addressArray),
          area = getArea(addressArray),
          stateRes = getState(addressArray),
          street = getStreet(addressArray),
          number = getNumber(addressArray),
          postal_code = getPostalCode(addressArray);

        setState((prevState: any) => ({
          ...prevState,
          id: state.id ? state.id : null,
          address: address ? address : '',
          area: area ? area : '',
          city: city ? city : '',
          state: stateRes ? stateRes : '',
          street: street ? street : '',
          number: number ? number : '',
          postal_code: postal_code ? postal_code : '',
          markerPosition: {
            lat: newLat,
            lng: newLng,
          },
          mapPosition: {
            lat: newLat,
            lng: newLng,
          },
        }));
      },
      (error) => {
        console.error(error);
      },
    );
  };

  const onMarkerDragEnd = (event: any) => {
    setMarkerPosition(event);
  };

  const handleMapClick = (event: any) => {
    setMarkerPosition(event);
  };

  const handleClickConfirmAddress = (newState: any) => {
    if (props.type == 'shipping') {
      props?.setLoading((prev: any) => ({ ...prev, confirmAddress: true }));
      setTimeout(() => {
        props?.setLoading((prev: any) => ({ ...prev, confirmAddress: false }));
      }, 10000);
      props?.setCheckoutForm((prev: any) => ({ ...prev, payment: null }));
      dispatch(
        actionsProduct.setMultiCardNamePlaceOrderForm({
          multi_card_name: '',
        }),
      );
    }
    const { number, street, city, postal_code } = newState;
    const address = `
      ${newState?.building_or_block ? newState?.building_or_block + ',' : ''}
      ${number}
      ${street}, 
      ${newState?.area ? newState?.area + ',' : ''} 
      ${city} ${postal_code}, Bangladesh
    `;

    let error = '';
    if (!localStorage.getItem('sundoraToken')) {
      error = 'Please login to proceed';
      if (localStorage.getItem('sundora_guest_id')) {
        error = '';
      }
    }
    if (!localStorage.getItem('sundoraToken') && !localStorage.getItem('sundora_guest_id')) {
      error = 'Please login or provide guest user info';
    }
    if (error.length) {
      toastr.error(error, 'Error');
      return;
    }

    Geocode.fromAddress(address.toString()).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const addressArray = response.results[0].address_components,
          city = getCity(addressArray),
          area = getArea(addressArray),
          state = getState(addressArray),
          street = getStreet(addressArray),
          number = getNumber(addressArray),
          postal_code = newState.postal_code;
        setState((prevState: any) => ({
          ...prevState,
          address: address ? address : '',
          area: area ? area : '',
          city: city ? city : '',
          state: state ? state : '',
          street: street ? street : '',
          number: number ? number : '',
          postal_code: postal_code ? postal_code : '',
          markerPosition: {
            lat: lat,
            lng: lng,
          },
          mapPosition: {
            lat: lat,
            lng: lng,
          },
        }));
        dispatch(
          action.addAddressActions({
            address: address ? address : '',
            area: area ? area : '',
            building_or_block: newState?.building_or_block ? newState?.building_or_block : '',
            additional_info: newState?.additional_info ? newState?.additional_info : '',
            state: state ? state : '',
            street: street ? street : '',
            number: number ? number : '',
            city: city ? city : '',
            postal_code: postal_code ? postal_code : '',
            province: '',
            province_code: '',
            country_code: '880',
            latitude: lat,
            longitude: lng,
            type: props?.type,
            isCheckoutForm: props.isCheckoutForm || false,
            user_id: parseInt(localStorage.getItem('sundora_guest_id') || ''),
          }),
        );
        props.confirmAddressStep({
          address: address ? address : '',
          area: area ? area : '',
          building_or_block: newState?.building_or_block ? newState?.building_or_block : '',
          additional_info: newState?.additional_info ? newState?.additional_info : '',
          state: state ? state : '',
          street: street ? street : '',
          number: number ? number : '',
          city: city ? city : '',
          province: '',
          province_code: '',
          country_code: '880',
          latitude: lat,
          longitude: lng,
        });
        setShowFormAddress(false);
      },
      (error) => {
        console.error(error);
      },
    );
  };

  const handleClickUpdateAddress = (id: any, newState: any) => {
    if (props.type == 'shipping') {
      props?.setLoading((prev: any) => ({ ...prev, confirmAddress: true }));
      setTimeout(() => {
        props?.setLoading((prev: any) => ({ ...prev, confirmAddress: false }));
      }, 10000);
      props?.setCheckoutForm((prev: any) => ({ ...prev, payment: null }));
      dispatch(
        actionsProduct.setMultiCardNamePlaceOrderForm({
          multi_card_name: '',
        }),
      );
    }

    const { number, street, city, postal_code } = newState;
    const addressFromNewState = `
      ${newState?.building_or_block ? newState?.building_or_block + ',' : ''}
      ${number}
      ${street}, 
      ${newState?.area ? newState?.area + ',' : ''} 
      ${city} ${postal_code}, Bangladesh
    `;

    let error = '';
    if (!localStorage.getItem('sundoraToken')) {
      error = 'Please login to proceed';
      if (localStorage.getItem('sundora_guest_id')) {
        error = '';
      }
    }
    if (!localStorage.getItem('sundoraToken') && !localStorage.getItem('sundora_guest_id')) {
      error = 'Please login or provide guest user info';
    }
    if (error.length) {
      toastr.error(error, 'Error');
      return;
    }

    Geocode.fromAddress(addressFromNewState).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const address = addressFromNewState,
          addressArray = response.results[0].address_components,
          city = getCity(addressArray),
          street = getStreet(addressArray),
          number = getNumber(addressArray),
          area = newState.area,
          building_or_block = newState.building_or_block,
          additional_info = newState.additional_info,
          postal_code = newState.postal_code;
        setState({
          address: address ? address : '',
          city: city ? city : '',
          area: area ? area : '',
          building_or_block: building_or_block ? building_or_block : '',
          additional_info: additional_info ? additional_info : '',
          street: street ? street : '',
          number: number ? number : '',
          postal_code: postal_code ? postal_code : '',
          markerPosition: {
            lat: lat,
            lng: lng,
          },
          mapPosition: {
            lat: lat,
            lng: lng,
          },
        });
        dispatch(
          action.updateAddressActions({
            id: id ? id : '',
            address: address ? address : '',
            area: area ? area : '',
            building_or_block: building_or_block ? building_or_block : '',
            additional_info: additional_info ? additional_info : '',
            street: street ? street : '',
            number: number ? number : '',
            city: city ? city : '',
            postal_code: postal_code ? postal_code : '',
            province: '',
            province_code: '',
            country_code: '880',
            latitude: lat,
            longitude: lng,
            type: props?.type,
            isCheckoutForm: props.isCheckoutForm || false,
          }),
        );
        setShowFormAddress(false);
      },
      (error) => {
        console.error(error);
      },
    );
  };

  const AsyncMap: any = withScriptjs(
    withGoogleMap(() => {
      return (
        <GoogleMap
          //   google={props.google}
          defaultZoom={15}
          defaultCenter={{
            lat: parseFloat(state?.mapPosition?.lat ? state?.mapPosition?.lat : 23.7919546),
            lng: parseFloat(state?.mapPosition?.lng ? state?.mapPosition?.lng : 90.4079771),
          }}
          onClick={handleMapClick}
        >
          {state?.mapPosition?.lat && state?.mapPosition?.lng ? (
            <>
              {/* InfoWindow on top of marker */}
              <InfoWindow
                // onClose={onInfoWindowClose}
                position={{
                  //   lat: state?.markerPosition?.lat ,
                  //   lng: state?.markerPosition?.lng,
                  lat:
                    parseFloat(
                      state?.mapPosition?.lat ? state?.mapPosition?.lat : 23.7919546,
                    ) + 0.0018,
                  lng: parseFloat(
                    state?.mapPosition?.lng ? state?.mapPosition?.lng : 90.4079771,
                  ),
                }}
              >
                <div>
                  <span style={{ padding: 0, margin: 0 }}>{state.address}</span>
                </div>
              </InfoWindow>
              {/*Marker*/}
              <Marker
                // google={props.google}
                // name={'Dolores park'}
                draggable={true}
                onDragEnd={onMarkerDragEnd}
                position={{
                  //   lat: state?.markerPosition?.lat,
                  //   lng: state.markerPosition?.lng,
                  lat: parseFloat(
                    state?.mapPosition?.lat ? state?.mapPosition?.lat : 23.7919546,
                  ),
                  lng: parseFloat(
                    state?.mapPosition?.lng ? state?.mapPosition?.lng : 90.4079771,
                  ),
                }}
              />
              <Marker />
            </>
          ) : (
            ''
          )}
        </GoogleMap>
      );
    }),
  );

  const handleClickAddressItem = (data: any) => {
    setUpdate(true);
    setState({
      id: data?.id || null,
      address: data?.address || '',
      building_or_block: data?.building_or_block || '',
      area: data?.area ? data.area : '',
      city: data?.city || '',
      state: data?.state ? data?.state : '',
      street: data?.street || '',
      number: data?.number || '',
      postal_code: data?.postal_code || null,
      additional_info: data?.additional_info || '',
      markerPosition: {
        lat: data?.latitude || '',
        lng: data?.longitude || '',
      },
      mapPosition: {
        lat: data?.latitude || '',
        lng: data?.longitude || '',
      },
    });
    setShowFormAddress(true);
  };

  const clearAddressForm = () => {
    setUpdate(false);
    setState(() => ({
      address: '',
      area: '',
      building_or_block: '',
      state: '',
      street: '',
      number: '',
      city: '',
      street2: '',
      postal_code: '',
      additional_info: '',

      // new variant

      // -----------
      mapPosition: {
        lat: null,
        lng: null,
      },
      markerPosition: {
        lat: null,
        lng: null,
      },
    }));
  };

  const handleClickAddAddress = () => {
    clearAddressForm();
    setShowFormAddress(true);
  };

  const handleDeleteAddress = (id: any) => {
    dispatch(action.deleteAddressActions({ id: id, type: props?.type }));
    clearAddressForm();
  };

  const renderAsyncMap = useCallback(() => {
    return (
      <AsyncMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API}&libraries=places`}
        loadingElement={<div style={{ height: props.height }} />}
        containerElement={<div style={{ height: props.height }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }, [state]);

  return (
    <>
      {props.center.lat !== undefined ? (
        <section className="wrapper-content-map">
          <div>
            <AddressForm
              handleClickConfirmAddress={handleClickConfirmAddress}
              handleClickUpdateAddress={handleClickUpdateAddress}
              handleDeleteAddress={handleDeleteAddress}
              center={props.center.lat}
              handleClickAddAddress={handleClickAddAddress}
              handleClickAddressItem={handleClickAddressItem}
              stateProps={state}
              isUpdate={isUpdate}
              fromCheckOut={props.fromCheckOut}
              isAllowDelete={props.isAllowDelete ? props.isAllowDelete : false}
              id={state.id ? state.id : null}
              type={props?.type}
              showFormAddress={showFormAddress}
              selectedAddressId={props.selectedAddressId}
            />

            {showFormAddress ? (
              <div style={{ minHeight: 'auto' }}>{renderAsyncMap()}</div>
            ) : null}
          </div>
        </section>
      ) : (
        <div style={{ height: props.height }}>loading</div>
      )}
    </>
  );
}
export default memo(Map);
