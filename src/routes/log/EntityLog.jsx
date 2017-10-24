import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import EntityLogGrid from '../../components/Log/EntityLogGrid';

function EntityLog({location, dispatch, entitylog}) {
	const {
	entityUuid,
	list,
	pagination
	} = entitylog;

	const {field, keyword} = location.query;

  	const logGridProps = {
	    dataSource: list,
	    pagination: pagination,
	    onPageChange(page, filters,sorter) {
	      dispatch(routerRedux.push({
	        pathname: '/inner/entitylog',
	        query: {
	          entityUuid:entityUuid,
	          page: page.current,
	          pageSize: page.pageSize,
	          sort: sorter.columnKey,
	          order: ((sorter.order) && (sorter.order.indexOf("asc") > -1)) ? "asc" : "desc"
	        }
	      }));
    	}
    };

	return (
	    <div className="content-inner">
	      	<EntityLogGrid {...logGridProps} />
	    </div>
	);
};

EntityLog.propTypes = {
    list: PropTypes.array,
    pagination: PropTypes.object
};

function mapStateToProps({entitylog}) {
  return { entitylog };
};
export default connect(mapStateToProps)(EntityLog);