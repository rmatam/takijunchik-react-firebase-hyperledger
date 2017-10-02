package com.nemesis1346.takijunchik.dataaccess;

import android.content.Context;
import android.support.annotation.NonNull;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ServerValue;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.nemesis1346.takijunchik.R;
import com.nemesis1346.takijunchik.models.UserModel;

import java.util.UUID;

/**
 * Created by nemesis1346 on 02/10/17.
 */

public class FirebaseHandler {
    private static FirebaseHandler instance = null;
    private Context mContext;

    private FirebaseAuth mFirebaseAuth;
    private DatabaseReference mFirebaseDatabaseReference;
    private FirebaseStorage mFirebaseStorage;
    private StorageReference mStorageRef;

    public static final String OBJECT_USER = "USERS";

    private FirebaseHandler(Context context) {
        mFirebaseAuth = FirebaseAuth.getInstance();
        mFirebaseDatabaseReference = FirebaseDatabase.getInstance().getReference();
        mFirebaseStorage = FirebaseStorage.getInstance();
        //todo chance to the current project
        mStorageRef = mFirebaseStorage.getReferenceFromUrl("gs://puppiessearch-7c275.appspot.com");
        this.mContext = context;
    }

    public static FirebaseHandler getInstance(Context context) {
        if (instance == null) {
            instance = new FirebaseHandler(context);
        }
        return instance;
    }

    public String uploadUserModel(UserModel userModel) {
        String uniqueId = UUID.randomUUID().toString();
        final String[] result = {""};
        userModel.setUserId(uniqueId);
        mFirebaseDatabaseReference.child(OBJECT_USER).child(userModel.getUserId()).setValue(userModel, ServerValue.TIMESTAMP).addOnSuccessListener(new OnSuccessListener<Void>() {
            @Override
            public void onSuccess(Void aVoid) {
                result[0] = mContext.getResources().getString(R.string.user_created_success);
            }
        }).addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                result[0] = e.getMessage();
            }
        });
        return result[0];
    }


}