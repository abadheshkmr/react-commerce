import './category-item.styles.scss'

const CategoryItem = ({category}) =>  (<div className='category-container'>
    
    {console.log(category)}
    <div className='background-image' style={{
      backgroundImage: `url(${category.imageUrl})`
    }}>
    </div>
    <div className='category-body-container'>
      <h2>{category.title}</h2>
      <p>Shop Now</p>
    </div>
  </div>)

 export default CategoryItem;