$(document).ready(function() {
  $.ajax({
    url: 'https://teaching-online-lms.herokuapp.com/api/admin/teacher-list',
    type: 'GET',
    headers: {
      'Authorization': sessionStorage.getItem('admin_token')
    },
    dataType: 'json',
    error: function(e) {
      console.log(e.message);
    },
    success: function(data) {
      for(let i = 0;i < data.length;i++) {
        var user_row = `<tr class="tr-shadow">
            <td class="users-column-1">${i+1}</td>
            <td class="users-column-2">${data[i].fullName}</td>
            <td class="users-column-3">${data[i].username}</td>
            <td class="users-column-4">123456</td>
            <td class="users-column-5">
              <span class="block-email">${data[i].email}</span>
            </td>
            <td class="users-column-6">${data[i].phoneNumber}</td>
            <td class="users-column-7">${data[i].address}</td>
            <td class="users-column-8">
              <div class="table-data-feature">
                <button class="item" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit">
                  <i class="fas fa-pen"></i>
                </button>
                <button class="item" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete">
                  <i class="fas fa-trash-alt"></i>
                </button>
                <button class="item" data-toggle="tooltip" data-placement="top" title="" data-original-title="More">
                  <i class="fas fa-ellipsis-v"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr class="spacer"></tr>`
        console.log(data);
        $('#users-table-content').append(user_row);
      }
    }
  });
})
