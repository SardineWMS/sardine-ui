import modelExtend from 'dva-model-extend';

const model = {
    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
    },
}

const pageModel = modelExtend(model, {
    state: {
        list: [],
        selectedRowKeys: [],
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total} 条`,
            current: 1,
            total: 0,
        },
        currentItem: {},
    },

    reducers: {
        querySuccess(state, { payload }) {
            const { list, pagination, showPage } = payload
            return {
                ...state,
                ...payload,
                list,
                showPage,
                pagination: {
                    ...state.pagination,
                    ...pagination,
                },
            }
        },
    },

})


module.exports = {
    model,
    pageModel,
}