import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { autobind } from 'core-decorators';
import pick from 'lodash/pick';
import find from 'lodash/find';
import mapValues from 'lodash/mapValues';

import { wishlistActions, wishlistActionsPropTypes } from 'wl/client/action';
import { wishlistStatePropTypes } from 'wl/client/reducer';
import { Theme } from 'wl/util';

import ProductsCatalog from './../products_catalog/products_catalog';

import styles from './wishlist_page.scss';

const mapStateToProps = state => pick(state, ['wishlist']);
const mapDispatchToProps = dispatch =>
  mapValues({ wishlistActions }, actionCreators =>
    bindActionCreators(actionCreators, dispatch)
  );

@connect(mapStateToProps, mapDispatchToProps)
@Theme(styles, 'WishlistPage')
@connect(mapStateToProps, mapDispatchToProps)
export class WishlistPage extends React.Component {
  static propTypes = {
    ...wishlistActionsPropTypes,
    ...wishlistStatePropTypes
  };

  render() {
    const { wishlist: { products }, theme } = this.props;
    return (
      <div className={theme('wishlist-page')}>
        <ProductsCatalog
          products={products}
          onProductClick={this.handleProductClick}
        />
      </div>
    );
  }

  @autobind
  handleProductClick(id) {
    const { wishlistActions: { removeFromWishlist } } = this.props;

    removeFromWishlist(id);
  }
}

export default WishlistPage;
