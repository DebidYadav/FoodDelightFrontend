const CardComponet = ({restaurant}) => {
    const {id, name, cusine, image} = restaurant;
    return(
        <div id={id}>
            <div style={{fontSize:'24px', fontWeight: 'bold'}}>{name}</div>
            <div style={{fontSize: '16px'}}>{cusine}</div>
            <img src={image} alt="" style={{height: 300, width: 300}}/>
        </div>
    );
};

export default CardComponet;