import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'

export default function AdminFooter () {
  return (
    <>
      <Helmet>
        {/*
         *************
         ************ JavaScript Files *************
         *************
         */}

        {/* Required jQuery first, then Bootstrap Bundle JS */}

        {/* <script src="https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js"></script>
                <script src="https://cdn.datatables.net/1.10.23/js/dataTables.bootstrap4.min.js"></script>  */}

        <script src='/admin/assets/js/vendor.bundle.js'></script>
        {/* <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.js"></script> */}

        {/* <script src="/admin/assets/js/app.bundle.js"></script> */}

        {/* <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
                <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script> */}

        {/* <script src="/admin/assets/js/demo/dashboard.js"></script> */}

        {/* 
                <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.js"></script>
                <script src="https://cdn.datatables.net/select/1.7.0/js/dataTables.select.min.js"></script> 
                */}

        {/* <script src="/employee/assets/vendor/jvectormap/jquery-jvectormap-2.0.5.min.js"></script>
                <script src="/employee/assets/vendor/jvectormap/world-mill-en.js"></script>
                <script src="/employee/assets/vendor/jvectormap/gdp-data.js"></script>
                <script src="/employee/assets/vendor/jvectormap/continents-mill.js"></script>
                <script src="/employee/assets/vendor/jvectormap/in-merc.js"></script>
                <script src="/employee/assets/vendor/jvectormap/custom/world-map-markers2.js"></script>   */}
      </Helmet>
    </>
  )
}
